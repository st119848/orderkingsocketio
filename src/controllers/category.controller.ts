import {
<<<<<<< HEAD
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from "@loopback/repository";
=======
  Filter,
  repository,
} from '@loopback/repository';
>>>>>>> add category
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
<<<<<<< HEAD
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody
} from "@loopback/rest";
import { Category } from "../models";
import { CategoryRepository } from "../repositories";
=======
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Category} from '../models';
import {CategoryRepository} from '../repositories';
>>>>>>> add category

export class CategoryController {
  constructor(
    @repository(CategoryRepository)
<<<<<<< HEAD
    public categoryRepository: CategoryRepository
  ) {}

  @post("/categories", {
    responses: {
      "200": {
        description: "Category model instance",
        content: { "application/json": { schema: getModelSchemaRef(Category) } }
      }
    }
=======
    public categoryRepository : CategoryRepository,
  ) {}

  @post('/categories', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(Category)}},
      },
    },
>>>>>>> add category
  })
  async create(
    @requestBody({
      content: {
<<<<<<< HEAD
        "application/json": {
          schema: getModelSchemaRef(Category, {
            exclude: ["id"]
          })
        }
      }
    })
    category: Omit<Category, "id">
=======
        'application/json': {
          schema: getModelSchemaRef(Category, {exclude: ['id']}),
        },
      },
    })
    category: Omit<Category, 'id'>,
>>>>>>> add category
  ): Promise<Category> {
    return this.categoryRepository.create(category);
  }

<<<<<<< HEAD
  @get("/categories/count", {
    responses: {
      "200": {
        description: "Category model count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object("where", getWhereSchemaFor(Category))
    where?: Where<Category>
  ): Promise<Count> {
    return this.categoryRepository.count(where);
  }

  @get("/categories", {
    responses: {
      "200": {
        description: "Array of Category model instances",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(Category) }
          }
        }
      }
    }
  })
  async find(
    @param.query.object("filter", getFilterSchemaFor(Category))
    filter?: Filter<Category>
=======
  @get('/categories', {
    responses: {
      '200': {
        description: 'Array of Category model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Category)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Category)) filter?: Filter<Category>,
>>>>>>> add category
  ): Promise<Category[]> {
    return this.categoryRepository.find(filter);
  }

<<<<<<< HEAD
  @patch("/categories", {
    responses: {
      "200": {
        description: "Category PATCH success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Category, { partial: true })
        }
      }
    })
    category: Category,
    @param.query.object("where", getWhereSchemaFor(Category))
    where?: Where<Category>
  ): Promise<Count> {
    return this.categoryRepository.updateAll(category, where);
  }

  @get("/categories/{id}", {
    responses: {
      "200": {
        description: "Category model instance",
        content: { "application/json": { schema: getModelSchemaRef(Category) } }
      }
    }
  })
  async findById(@param.path.number("id") id: number): Promise<Category> {
    return this.categoryRepository.findById(id);
  }

  @patch("/categories/{id}", {
    responses: {
      "204": {
        description: "Category PATCH success"
      }
    }
  })
  async updateById(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Category, { partial: true })
        }
      }
    })
    category: Category
=======
  @get('/categories/{id}', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(Category)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Category> {
    return this.categoryRepository.findById(id);
  }

  @patch('/categories/{id}', {
    responses: {
      '204': {
        description: 'Category PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {partial: true}),
        },
      },
    })
    category: Category,
>>>>>>> add category
  ): Promise<void> {
    await this.categoryRepository.updateById(id, category);
  }

<<<<<<< HEAD
  @put("/categories/{id}", {
    responses: {
      "204": {
        description: "Category PUT success"
      }
    }
  })
  async replaceById(
    @param.path.number("id") id: number,
    @requestBody() category: Category
  ): Promise<void> {
    await this.categoryRepository.replaceById(id, category);
  }

  @del("/categories/{id}", {
    responses: {
      "204": {
        description: "Category DELETE success"
      }
    }
  })
  async deleteById(@param.path.number("id") id: number): Promise<void> {
=======
  @del('/categories/{id}', {
    responses: {
      '204': {
        description: 'Category DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
>>>>>>> add category
    await this.categoryRepository.deleteById(id);
  }
}
