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
import { Branch, Category } from "../models";
import { BranchRepository } from "../repositories";

export class BranchCategoryController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository
  ) {}

  @get("/branches/{id}/categories", {
    responses: {
      "200": {
        description: "Array of Category's belonging to Branch",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(Category) }
          }
        }
      }
    }
  })
  async find(
    @param.path.number("id") id: number,
    @param.query.object("filter") filter?: Filter<Category>
  ): Promise<Category[]> {
    return this.branchRepository.categories(id).find(filter);
  }

  @post("/branches/{id}/categories", {
    responses: {
      "200": {
        description: "Branch model instance",
        content: { "application/json": { schema: getModelSchemaRef(Category) } }
      }
    }
  })
  async create(
    @param.path.number("id") id: typeof Branch.prototype.id,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Category, {
            exclude: ["id"],
            optional: ["branchId"]
          })
        }
      }
    })
    category: Omit<Category, "id">
  ): Promise<Category> {
    return this.branchRepository.categories(id).create(category);
  }

  @patch("/branches/{id}/categories", {
    responses: {
      "200": {
        description: "Branch.Category PATCH success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async patch(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Category, { partial: true })
        }
      }
    })
    category: Partial<Category>,
    @param.query.object("where", getWhereSchemaFor(Category))
    where?: Where<Category>
  ): Promise<Count> {
    return this.branchRepository.categories(id).patch(category, where);
  }

  @del("/branches/{id}/categories", {
    responses: {
      "200": {
        description: "Branch.Category DELETE success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async delete(
    @param.path.number("id") id: number,
    @param.query.object("where", getWhereSchemaFor(Category))
    where?: Where<Category>
  ): Promise<Count> {
    return this.branchRepository.categories(id).delete(where);
  }
}
