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
import { Branch, Bills } from "../models";
import { BranchRepository } from "../repositories";

export class BranchBillsController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository
  ) {}

  @get("/branches/{id}/bills", {
    responses: {
      "200": {
        description: "Array of Bills's belonging to Branch",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(Bills) }
          }
        }
      }
    }
  })
  async find(
    @param.path.number("id") id: number,
    @param.query.object("filter") filter?: Filter<Bills>
  ): Promise<Bills[]> {
    return this.branchRepository.bills(id).find(filter);
  }

  @post("/branches/{id}/bills", {
    responses: {
      "200": {
        description: "Branch model instance",
        content: { "application/json": { schema: getModelSchemaRef(Bills) } }
      }
    }
  })
  async create(
    @param.path.number("id") id: typeof Branch.prototype.id,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Bills, {
            exclude: ["id"],
            optional: ["branchId"]
          })
        }
      }
    })
    bills: Omit<Bills, "id">
  ): Promise<Bills> {
    return this.branchRepository.bills(id).create(bills);
  }

  @patch("/branches/{id}/bills", {
    responses: {
      "200": {
        description: "Branch.Bills PATCH success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async patch(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Bills, { partial: true })
        }
      }
    })
    bills: Partial<Bills>,
    @param.query.object("where", getWhereSchemaFor(Bills)) where?: Where<Bills>
  ): Promise<Count> {
    return this.branchRepository.bills(id).patch(bills, where);
  }

  @del("/branches/{id}/bills", {
    responses: {
      "200": {
        description: "Branch.Bills DELETE success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async delete(
    @param.path.number("id") id: number,
    @param.query.object("where", getWhereSchemaFor(Bills)) where?: Where<Bills>
  ): Promise<Count> {
    return this.branchRepository.bills(id).delete(where);
  }
}
