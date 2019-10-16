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
import { Branch, Order } from "../models";
import { BranchRepository } from "../repositories";

export class BranchOrderController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository
  ) {}

  @get("/branches/{id}/orders", {
    responses: {
      "200": {
        description: "Array of Order's belonging to Branch",
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
    return this.branchRepository.orders(id).find(filter);
  }

  @post("/branches/{id}/orders", {
    responses: {
      "200": {
        description: "Branch model instance",
        content: { "application/json": { schema: getModelSchemaRef(Order) } }
      }
    }
  })
  async create(
    @param.path.number("id") id: typeof Branch.prototype.id,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Order, {
            exclude: ["id"],
            optional: ["branchId"]
          })
        }
      }
    })
    order: Omit<Order, "id">
  ): Promise<Order> {
    return this.branchRepository.orders(id).create(order);
  }

  @patch("/branches/{id}/orders", {
    responses: {
      "200": {
        description: "Branch.Order PATCH success count",
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
    return this.branchRepository.orders(id).patch(order, where);
  }

  @del("/branches/{id}/orders", {
    responses: {
      "200": {
        description: "Branch.Order DELETE success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async delete(
    @param.path.number("id") id: number,
    @param.query.object("where", getWhereSchemaFor(Order)) where?: Where<Order>
  ): Promise<Count> {
    return this.branchRepository.orders(id).delete(where);
  }
}
