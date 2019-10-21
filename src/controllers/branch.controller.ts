import { Filter, repository, relation } from "@loopback/repository";
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  patch,
  del,
  requestBody
} from "@loopback/rest";
import { Branch } from "../models";
import { BranchRepository } from "../repositories";

export class BranchController {
  constructor(
    @repository(BranchRepository)
    public branchRepository: BranchRepository
  ) {}

  @post("/branches", {
    responses: {
      "200": {
        description: "Branch model instance",
        content: { "application/json": { schema: getModelSchemaRef(Branch) } }
      }
    }
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Branch, { exclude: ["id"] })
        }
      }
    })
    branch: Omit<Branch, "id">
  ): Promise<Branch> {
    return this.branchRepository.create(branch);
  }

  @get("/branches", {
    responses: {
      "200": {
        description: "Array of Branch model instances",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(Branch) }
          }
        }
      }
    }
  })
  async find(
    @param.query.object("filter", getFilterSchemaFor(Branch))
    filter?: Filter<Branch>
  ): Promise<Branch[]> {
    // return this.branchRepository.find({ include: [{ relation: "products" }]});
    // return this.branchRepository.find({
    //   include: [
    //     { relation: "products", scope: { include: [{ relation: "station" }] } }
    //   ]
    // });
    return this.branchRepository.find({
      include: [
        {
          relation: "products",
          scope: { include: [{ relation: "station" }] }
        }
      ]
    });
  }

  @get("/branches/{id}", {
    responses: {
      "200": {
        description: "Branch model instance",
        content: { "application/json": { schema: getModelSchemaRef(Branch) } }
      }
    }
  })
  async findById(@param.path.number("id") id: number): Promise<Branch> {
    return this.branchRepository.findById(id);
  }

  @patch("/branches/{id}", {
    responses: {
      "204": {
        description: "Branch PATCH success"
      }
    }
  })
  async updateById(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Branch, { partial: true })
        }
      }
    })
    branch: Branch
  ): Promise<void> {
    await this.branchRepository.updateById(id, branch);
  }

  @del("/branches/{id}", {
    responses: {
      "204": {
        description: "Branch DELETE success"
      }
    }
  })
  async deleteById(@param.path.number("id") id: number): Promise<void> {
    await this.branchRepository.deleteById(id);
  }
}
