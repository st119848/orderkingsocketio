// Uncomment these imports to begin using these cool features!
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from "@loopback/repository";
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
  RawBodyParser
} from "@loopback/rest";

import { EmployeeRepository } from "../repositories";
import { Socket } from "socket.io";
import { ws } from "../decorators/websocket.decorator";
import { Employee } from "../models";
import { Callback, DataSource } from "loopback-datasource-juggler";
import { log } from "util";
import * as connect from "../datasources/db.datasource.json";
export class WebSocketQueueController {
  constructor(
    @repository(
      Employee,

      new DataSource(connect)
    )
    public repository: EmployeeRepository,
    @ws.socket() // Equivalent to `@inject('ws.socket')`
    private socket: Socket // @repository(EmployeeRepository) // public employeeRepository: EmployeeRepository // @repository.getter("UserRepository") // protected userRepositoryGetter: Getter<UserRepository>
  ) {}

  /**
   * The method is invoked when a client connects to the server
   * @param socket
   */
  @ws.connect()
  async connect(socket: Socket) {
    console.log("Client join: %s", this.socket.id);
    socket.join("rest1");
    socket.emit("queue1", await this.repository.find());
  }

  /**
   * Register a handler for 'chat message' events
   * @param msg
   */
  @ws.subscribe("queue1")
  // @ws.emit('namespace' | 'requestor' | 'broadcast')
  async handleChatMessage(msg: unknown) {
    try {
      const newEmployee = new Employee({
        photo: "string",
        firstname: "string",
        lastname: "string",
        groupId: 0,
        userId: 0
      });
      const reser = await this.repository.create(newEmployee);
      this.socket.nsp.emit(
        "queue1",

        await this.repository.find({
          order: ["id desc"],
          limit: 1
        })
      );
    } catch (e) {
      console.error(e.Message + "some error");
    }
  }

  @ws.subscribe("queue1delete")
  async delete(element: unknown) {
    //element.
    this.socket.nsp.emit("queue1delete", element);
    const intid = Number(element);
    if (intid !== 0) {
      this.repository.deleteById(intid);
    }
  }

  /**
   * Register a handler for all events
   * @param msg
   */
  @ws.subscribe(/.+/)
  logMessage(...args: unknown[]) {
    console.log("Message: %s", args);
  }

  /**
   * The method is invoked when a client disconnects from the server
   * @param socket
   */
  @ws.disconnect()
  disconnect() {
    //socket.emit("disconnect", 1);
    console.log("Client disconnected: %s", this.socket.id);
  }
}
