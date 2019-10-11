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
  put,
  del,
  requestBody
} from "@loopback/rest";
import { Bills } from "../models";
import { BillsRepository } from "../repositories";

export class BillsController {
  constructor(
    @repository(BillsRepository)
    public billsRepository: BillsRepository
  ) {}

  @post("/bills", {
    responses: {
      "200": {
        description: "Bills model instance",
        content: { "application/json": { schema: getModelSchemaRef(Bills) } }
      }
    }
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Bills, {
            exclude: ["id"]
          })
        }
      }
    })
    bills: Omit<Bills, "id">
  ): Promise<Bills> {
    return this.billsRepository.create(bills);
  }

  @get("/bills/count", {
    responses: {
      "200": {
        description: "Bills model count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object("where", getWhereSchemaFor(Bills)) where?: Where<Bills>
  ): Promise<Count> {
    return this.billsRepository.count(where);
  }

  @get("/bills", {
    responses: {
      "200": {
        description: "Array of Bills model instances",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(Bills) }
          }
        }
      }
    }
  })
  async find(
    @param.query.object("filter", getFilterSchemaFor(Bills))
    filter?: Filter<Bills>
  ): Promise<Bills[]> {
    return this.billsRepository.find(filter);
  }

  @patch("/bills", {
    responses: {
      "200": {
        description: "Bills PATCH success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Bills, { partial: true })
        }
      }
    })
    bills: Bills,
    @param.query.object("where", getWhereSchemaFor(Bills)) where?: Where<Bills>
  ): Promise<Count> {
    return this.billsRepository.updateAll(bills, where);
  }

  @get("/bills/{id}", {
    responses: {
      "200": {
        description: "Bills model instance",
        content: { "application/json": { schema: getModelSchemaRef(Bills) } }
      }
    }
  })
  async findById(@param.path.number("id") id: number): Promise<Bills> {
    return this.billsRepository.findById(id);
  }

  @patch("/bills/{id}", {
    responses: {
      "204": {
        description: "Bills PATCH success"
      }
    }
  })
  async updateById(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Bills, { partial: true })
        }
      }
    })
    bills: Bills
  ): Promise<void> {
    await this.billsRepository.updateById(id, bills);
  }

  @put("/bills/{id}", {
    responses: {
      "204": {
        description: "Bills PUT success"
      }
    }
  })
  async replaceById(
    @param.path.number("id") id: number,
    @requestBody() bills: Bills
  ): Promise<void> {
    await this.billsRepository.replaceById(id, bills);
  }

  @del("/bills/{id}", {
    responses: {
      "204": {
        description: "Bills DELETE success"
      }
    }
  })
  async deleteById(@param.path.number("id") id: number): Promise<void> {
    await this.billsRepository.deleteById(id);
  }
}
