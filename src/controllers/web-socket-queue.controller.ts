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

import { OrderRepository } from "../repositories";
import { Socket } from "socket.io";
import { ws } from "../decorators/websocket.decorator";
import { Employee, Table, Order } from "../models";
import { Callback, DataSource } from "loopback-datasource-juggler";
import { log } from "util";
import * as connect from "../datasources/db.datasource.json";
export class WebSocketQueueController {
  privatesocket: Socket;
  constructor(
    @repository(Order, new DataSource(connect))
    public repository: OrderRepository,
    @ws.socket() // Equivalent to `@inject('ws.socket')`
    private socket: Socket // @repository(EmployeeRepository)
  ) {}

  /**
   * The method is invoked when a client connects to the server
   * @param socket
   */
  @ws.connect()
  async connect(socket: Socket) {
    console.log("Client join: %s", this.socket.id);
    socket.join("kitchen");
    this.privatesocket = socket;
    this.privatesocket.emit("get-initial-data", "for connect only");
    // socket.emit("get-initial-data", () => {
    //   return this.repository.find({ where: {} });
    //   console.log("sdfsdfsd ");
    // });
    console.log("userconnect");
  }

  /**
   * Register a handler for 'chat message' events
   * @param msg
   */
  @ws.subscribe("need-initial-order")
  // @ws.emit('namespace' | 'requestor' | 'broadcast')
  async handleChatInitialOrder(msg: number) {
    try {
      //const reser = await this.repository.create(order);
      this.socket.nsp.emit(
        "get-add-edit-order",
        await this.repository.find({
          order: ["id desc"],
          limit: 1
        })
      );
    } catch (e) {
      console.error(e.Message + "some error");
    }
  }
  /**
   * Register a handler for 'chat message' events
   * @param msg
   */
  @ws.subscribe("add-order")
  // @ws.emit('namespace' | 'requestor' | 'broadcast')
  async handleChatAdd(order: Order) {
    try {
      const reser = await this.repository.create(order);
      this.socket.nsp.emit(
        "get-add-edit-order",
        await this.repository.find({
          order: ["id desc"],
          limit: 1
        })
      );
    } catch (e) {
      console.error(e.Message + "some error");
    }
  }
  /**
   * Register a handler for 'chat message' events
   * @param msg
   */
  @ws.subscribe("edit-order")
  // @ws.emit('namespace' | 'requestor' | 'broadcast')
  async handleChatEdit(order: Order) {
    try {
      const reser = await this.repository.update(order);
      this.socket.nsp.emit("get-add-edit-order", order);
    } catch (e) {
      console.error(e.Message + "some error");
    }
  }

  // @ws.subscribe("delete-order")
  // // @ws.emit('namespace' | 'requestor' | 'broadcast')
  // async handleChatDelete(msg: unknown) {
  //   try {
  //     // const reser = await this.repository.create(newEmployee);
  //     this.socket.nsp.emit(
  //       "get-delete-order",

  //       await this.repository.find({
  //         order: ["id desc"],
  //         limit: 1
  //       })
  //     );
  //   } catch (e) {
  //     console.error(e.Message + "some error");
  //   }
  // }

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
