import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from "@loopback/repository";
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from "@loopback/rest";
import { User, Order } from "../models";
import { UserRepository } from "../repositories";

export class UserOrderController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository
  ) {}

  @get("/users/{id}/orders", {
    responses: {
      "200": {
        description: "Array of Order's belonging to User",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(Order) }
          }
        }
      }
    }
  })
  async find(
    @param.path.number("id") id: number,
    @param.query.object("filter") filter?: Filter<Order>
  ): Promise<Order[]> {
    return this.userRepository.orders(id).find(filter);
  }

  @post("/users/{id}/orders", {
    responses: {
      "200": {
        description: "User model instance",
        content: { "application/json": { schema: getModelSchemaRef(Order) } }
      }
    }
  })
  async create(
    @param.path.number("id") id: typeof User.prototype.id,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Order, {
            exclude: ["id"],
            optional: ["userId"]
          })
        }
      }
    })
    order: Omit<Order, "id">
  ): Promise<Order> {
    return this.userRepository.orders(id).create(order);
  }

  @patch("/users/{id}/orders", {
    responses: {
      "200": {
        description: "User.Order PATCH success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async patch(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Order, { partial: true })
        }
      }
    })
    order: Partial<Order>,
    @param.query.object("where", getWhereSchemaFor(Order)) where?: Where<Order>
  ): Promise<Count> {
    return this.userRepository.orders(id).patch(order, where);
  }

  @del("/users/{id}/orders", {
    responses: {
      "200": {
        description: "User.Order DELETE success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async delete(
    @param.path.number("id") id: number,
    @param.query.object("where", getWhereSchemaFor(Order)) where?: Where<Order>
  ): Promise<Count> {
    return this.userRepository.orders(id).delete(where);
  }
}
