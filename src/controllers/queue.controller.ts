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
import { Queue } from "../models";
import { QueueRepository } from "../repositories";

export class QueueController {
  constructor(
    @repository(QueueRepository)
    public queueRepository: QueueRepository
  ) {}

  @post("/queues", {
    responses: {
      "200": {
        description: "Queue model instance",
        content: { "application/json": { schema: getModelSchemaRef(Queue) } }
      }
    }
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Queue, {
            exclude: ["id"]
          })
        }
      }
    })
    queue: Omit<Queue, "id">
  ): Promise<Queue> {
    return this.queueRepository.create(queue);
  }

  @get("/queues/count", {
    responses: {
      "200": {
        description: "Queue model count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object("where", getWhereSchemaFor(Queue)) where?: Where<Queue>
  ): Promise<Count> {
    return this.queueRepository.count(where);
  }

  @get("/queues", {
    responses: {
      "200": {
        description: "Array of Queue model instances",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(Queue) }
          }
        }
      }
    }
  })
  async find(
    @param.query.object("filter", getFilterSchemaFor(Queue))
    filter?: Filter<Queue>
  ): Promise<Queue[]> {
    return this.queueRepository.find(filter);
  }

  @patch("/queues", {
    responses: {
      "200": {
        description: "Queue PATCH success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Queue, { partial: true })
        }
      }
    })
    queue: Queue,
    @param.query.object("where", getWhereSchemaFor(Queue)) where?: Where<Queue>
  ): Promise<Count> {
    return this.queueRepository.updateAll(queue, where);
  }

  @get("/queues/{id}", {
    responses: {
      "200": {
        description: "Queue model instance",
        content: { "application/json": { schema: getModelSchemaRef(Queue) } }
      }
    }
  })
  async findById(@param.path.number("id") id: number): Promise<Queue> {
    return this.queueRepository.findById(id);
  }

  @patch("/queues/{id}", {
    responses: {
      "204": {
        description: "Queue PATCH success"
      }
    }
  })
  async updateById(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Queue, { partial: true })
        }
      }
    })
    queue: Queue
  ): Promise<void> {
    await this.queueRepository.updateById(id, queue);
  }

  @put("/queues/{id}", {
    responses: {
      "204": {
        description: "Queue PUT success"
      }
    }
  })
  async replaceById(
    @param.path.number("id") id: number,
    @requestBody() queue: Queue
  ): Promise<void> {
    await this.queueRepository.replaceById(id, queue);
  }

  @del("/queues/{id}", {
    responses: {
      "204": {
        description: "Queue DELETE success"
      }
    }
  })
  async deleteById(@param.path.number("id") id: number): Promise<void> {
    await this.queueRepository.deleteById(id);
  }
}
