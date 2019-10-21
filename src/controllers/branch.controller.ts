<<<<<<< HEAD
import { Filter, repository, relation } from "@loopback/repository";
=======
import {
  Filter,
  repository,
} from '@loopback/repository';
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  patch,
  del,
<<<<<<< HEAD
  requestBody
} from "@loopback/rest";
import { Branch } from "../models";
import { BranchRepository } from "../repositories";
=======
  requestBody,
} from '@loopback/rest';
import {Branch} from '../models';
import {BranchRepository} from '../repositories';
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254

export class BranchController {
  constructor(
    @repository(BranchRepository)
<<<<<<< HEAD
    public branchRepository: BranchRepository
  ) {}

  @post("/branches", {
    responses: {
      "200": {
        description: "Branch model instance",
        content: { "application/json": { schema: getModelSchemaRef(Branch) } }
      }
    }
=======
    public branchRepository : BranchRepository,
  ) {}

  @post('/branches', {
    responses: {
      '200': {
        description: 'Branch model instance',
        content: {'application/json': {schema: getModelSchemaRef(Branch)}},
      },
    },
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  })
  async create(
    @requestBody({
      content: {
<<<<<<< HEAD
        "application/json": {
          schema: getModelSchemaRef(Branch, { exclude: ["id"] })
        }
      }
    })
    branch: Omit<Branch, "id">
=======
        'application/json': {
          schema: getModelSchemaRef(Branch, {exclude: ['id']}),
        },
      },
    })
    branch: Omit<Branch, 'id'>,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  ): Promise<Branch> {
    return this.branchRepository.create(branch);
  }

<<<<<<< HEAD
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
=======
  @get('/branches', {
    responses: {
      '200': {
        description: 'Array of Branch model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Branch)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Branch)) filter?: Filter<Branch>,
  ): Promise<Branch[]> {
    return this.branchRepository.find(filter);
  }

  @get('/branches/{id}', {
    responses: {
      '200': {
        description: 'Branch model instance',
        content: {'application/json': {schema: getModelSchemaRef(Branch)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Branch> {
    return this.branchRepository.findById(id);
  }

  @patch('/branches/{id}', {
    responses: {
      '204': {
        description: 'Branch PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Branch, {partial: true}),
        },
      },
    })
    branch: Branch,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  ): Promise<void> {
    await this.branchRepository.updateById(id, branch);
  }

<<<<<<< HEAD
  @del("/branches/{id}", {
    responses: {
      "204": {
        description: "Branch DELETE success"
      }
    }
  })
  async deleteById(@param.path.number("id") id: number): Promise<void> {
=======
  @del('/branches/{id}', {
    responses: {
      '204': {
        description: 'Branch DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
    await this.branchRepository.deleteById(id);
  }
}
