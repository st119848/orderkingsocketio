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
import { JoinTable } from "../models";
import { JoinTableRepository } from "../repositories";

export class JoinTableController {
  constructor(
    @repository(JoinTableRepository)
    public joinTableRepository: JoinTableRepository
  ) {}

  @post("/join-tables", {
    responses: {
      "200": {
        description: "JoinTable model instance",
        content: {
          "application/json": { schema: getModelSchemaRef(JoinTable) }
        }
      }
    }
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(JoinTable, {
            exclude: ["id"]
          })
        }
      }
    })
    joinTable: Omit<JoinTable, "id">
  ): Promise<JoinTable> {
    return this.joinTableRepository.create(joinTable);
  }

  @get("/join-tables/count", {
    responses: {
      "200": {
        description: "JoinTable model count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object("where", getWhereSchemaFor(JoinTable))
    where?: Where<JoinTable>
  ): Promise<Count> {
    return this.joinTableRepository.count(where);
  }

  @get("/join-tables", {
    responses: {
      "200": {
        description: "Array of JoinTable model instances",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(JoinTable) }
          }
        }
      }
    }
  })
  async find(
    @param.query.object("filter", getFilterSchemaFor(JoinTable))
    filter?: Filter<JoinTable>
  ): Promise<JoinTable[]> {
    return this.joinTableRepository.find(filter);
  }

  @patch("/join-tables", {
    responses: {
      "200": {
        description: "JoinTable PATCH success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(JoinTable, { partial: true })
        }
      }
    })
    joinTable: JoinTable,
    @param.query.object("where", getWhereSchemaFor(JoinTable))
    where?: Where<JoinTable>
  ): Promise<Count> {
    return this.joinTableRepository.updateAll(joinTable, where);
  }

  @get("/join-tables/{id}", {
    responses: {
      "200": {
        description: "JoinTable model instance",
        content: {
          "application/json": { schema: getModelSchemaRef(JoinTable) }
        }
      }
    }
  })
  async findById(@param.path.number("id") id: number): Promise<JoinTable> {
    return this.joinTableRepository.findById(id);
  }

  @patch("/join-tables/{id}", {
    responses: {
      "204": {
        description: "JoinTable PATCH success"
      }
    }
  })
  async updateById(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(JoinTable, { partial: true })
        }
      }
    })
    joinTable: JoinTable
  ): Promise<void> {
    await this.joinTableRepository.updateById(id, joinTable);
  }

  @put("/join-tables/{id}", {
    responses: {
      "204": {
        description: "JoinTable PUT success"
      }
    }
  })
  async replaceById(
    @param.path.number("id") id: number,
    @requestBody() joinTable: JoinTable
  ): Promise<void> {
    await this.joinTableRepository.replaceById(id, joinTable);
  }

  @del("/join-tables/{id}", {
    responses: {
      "204": {
        description: "JoinTable DELETE success"
      }
    }
  })
  async deleteById(@param.path.number("id") id: number): Promise<void> {
    await this.joinTableRepository.deleteById(id);
  }
}
