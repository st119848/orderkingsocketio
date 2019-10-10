import {
  Filter,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {ProductOptionChoice} from '../models';
import {ProductOptionChoiceRepository} from '../repositories';

export class ProductOptionChoiceController {
  constructor(
    @repository(ProductOptionChoiceRepository)
    public productOptionChoiceRepository : ProductOptionChoiceRepository,
  ) {}

  @post('/product-option-choices', {
    responses: {
      '200': {
        description: 'ProductOptionChoice model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductOptionChoice)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductOptionChoice, {exclude: ['id']}),
        },
      },
    })
    productOptionChoice: Omit<ProductOptionChoice, 'id'>,
  ): Promise<ProductOptionChoice> {
    return this.productOptionChoiceRepository.create(productOptionChoice);
  }

  @get('/product-option-choices', {
    responses: {
      '200': {
        description: 'Array of ProductOptionChoice model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductOptionChoice)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ProductOptionChoice)) filter?: Filter<ProductOptionChoice>,
  ): Promise<ProductOptionChoice[]> {
    return this.productOptionChoiceRepository.find(filter);
  }

  @get('/product-option-choices/{id}', {
    responses: {
      '200': {
        description: 'ProductOptionChoice model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductOptionChoice)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ProductOptionChoice> {
    return this.productOptionChoiceRepository.findById(id);
  }

  @patch('/product-option-choices/{id}', {
    responses: {
      '204': {
        description: 'ProductOptionChoice PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductOptionChoice, {partial: true}),
        },
      },
    })
    productOptionChoice: ProductOptionChoice,
  ): Promise<void> {
    await this.productOptionChoiceRepository.updateById(id, productOptionChoice);
  }

  @del('/product-option-choices/{id}', {
    responses: {
      '204': {
        description: 'ProductOptionChoice DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productOptionChoiceRepository.deleteById(id);
  }
}
