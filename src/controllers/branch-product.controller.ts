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
import { Branch, Product } from "../models";
import { BranchRepository } from "../repositories";

export class BranchProductController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository
  ) {}

  @get("/branches/{id}/products", {
    responses: {
      "200": {
        description: "Array of Product's belonging to Branch",
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
    return this.branchRepository.products(id).find(filter);
  }

  @post("/branches/{id}/products", {
    responses: {
      "200": {
        description: "Branch model instance",
        content: { "application/json": { schema: getModelSchemaRef(Product) } }
      }
    }
  })
  async create(
    @param.path.number("id") id: typeof Branch.prototype.id,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Product, {
            exclude: ["id"],
            optional: ["branchId"]
          })
        }
      }
    })
    product: Omit<Product, "id">
  ): Promise<Product> {
    return this.branchRepository.products(id).create(product);
  }

  @patch("/branches/{id}/products", {
    responses: {
      "200": {
        description: "Branch.Product PATCH success count",
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
    return this.branchRepository.products(id).patch(product, where);
  }

  @del("/branches/{id}/products", {
    responses: {
      "200": {
        description: "Branch.Product DELETE success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async delete(
    @param.path.number("id") id: number,
    @param.query.object("where", getWhereSchemaFor(Product))
    where?: Where<Product>
  ): Promise<Count> {
    return this.branchRepository.products(id).delete(where);
  }
}
