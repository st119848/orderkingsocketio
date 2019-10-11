import { BootMixin } from "@loopback/boot";
import { ApplicationConfig } from "@loopback/core";
import {
  RestExplorerBindings,
  RestExplorerComponent
} from "@loopback/rest-explorer";
import { RepositoryMixin } from "@loopback/repository";
import { RestApplication } from "@loopback/rest";
import { ServiceMixin } from "@loopback/service-proxy";
import * as path from "path";
import { MySequence } from "./sequence";
import * as express from "express";
import { HttpServer } from "@loopback/http-server";
import { WebSocketServer } from "./websocket.server";
import { WebSocketQueueController } from "./controllers/web-socket-queue.controller";

export class OrderkingApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication))
) {
  readonly httpServer: HttpServer;
  readonly wsServer: WebSocketServer;
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static("/", path.join(__dirname, "../public"));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: "/explorer"
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ["controllers"],
        extensions: [".controller.js"],
        nested: true
      }
    };

    //socket server
    const expressApp = express();
    const root = path.resolve(__dirname, "../public");

    expressApp.use("/", express.static(root));

    this.httpServer = new HttpServer(expressApp, { port: 7777, host: "" });
    // Create ws server from the http server
    const wsServer = new WebSocketServer(this.httpServer);
    this.bind("servers.websocket.server1").to(wsServer);
    wsServer.use((socket, next) => {
      console.log("Global middleware - socket:", socket.id);
      next();
    });
    //Add route 2 test
    const ns2 = wsServer.route(WebSocketQueueController, "/queue1");
    ns2.use((socket, next) => {
      console.log(
        "Middleware for namespace %s - socket: %s",
        socket.nsp.name,
        socket.id
      );
      next();
    });
    //end test
    this.wsServer = wsServer;
    //end socket
  }
  async start() {
    await super.start();
    await this.wsServer.start();
  }

  stop() {
    return this.wsServer.stop();
  }
}
