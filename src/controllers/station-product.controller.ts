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
import { Station, Product } from "../models";
import { StationRepository } from "../repositories";

export class StationProductController {
  constructor(
    @repository(StationRepository)
    protected stationRepository: StationRepository
  ) {}

  @get("/stations/{id}/products", {
    responses: {
      "200": {
        description: "Array of Product's belonging to Station",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(Product) }
          }
        }
      }
    }
  })
  async find(
    @param.path.number("id") id: number,
    @param.query.object("filter") filter?: Filter<Product>
  ): Promise<Product[]> {
    return this.stationRepository.products(id).find(filter);
  }

  @post("/stations/{id}/products", {
    responses: {
      "200": {
        description: "Station model instance",
        content: { "application/json": { schema: getModelSchemaRef(Product) } }
      }
    }
  })
  async create(
    @param.path.number("id") id: typeof Station.prototype.id,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Product, {
            exclude: ["id"],
            optional: ["stationId"]
          })
        }
      }
    })
    product: Omit<Product, "id">
  ): Promise<Product> {
    return this.stationRepository.products(id).create(product);
  }

  @patch("/stations/{id}/products", {
    responses: {
      "200": {
        description: "Station.Product PATCH success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async patch(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Product, { partial: true })
        }
      }
    })
    product: Partial<Product>,
    @param.query.object("where", getWhereSchemaFor(Product))
    where?: Where<Product>
  ): Promise<Count> {
    return this.stationRepository.products(id).patch(product, where);
  }

  @del("/stations/{id}/products", {
    responses: {
      "200": {
        description: "Station.Product DELETE success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async delete(
    @param.path.number("id") id: number,
    @param.query.object("where", getWhereSchemaFor(Product))
    where?: Where<Product>
  ): Promise<Count> {
    return this.stationRepository.products(id).delete(where);
  }
}
