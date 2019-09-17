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
import {ProductOption} from '../models';
import {ProductOptionRepository} from '../repositories';

export class ProductOptionController {
  constructor(
    @repository(ProductOptionRepository)
    public productOptionRepository : ProductOptionRepository,
  ) {}

  @post('/product-options', {
    responses: {
      '200': {
        description: 'ProductOption model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductOption)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductOption, {exclude: ['id']}),
        },
      },
    })
    productOption: Omit<ProductOption, 'id'>,
  ): Promise<ProductOption> {
    return this.productOptionRepository.create(productOption);
  }

  @get('/product-options', {
    responses: {
      '200': {
        description: 'Array of ProductOption model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductOption)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ProductOption)) filter?: Filter<ProductOption>,
  ): Promise<ProductOption[]> {
    return this.productOptionRepository.find(filter);
  }

  @get('/product-options/{id}', {
    responses: {
      '200': {
        description: 'ProductOption model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductOption)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ProductOption> {
    return this.productOptionRepository.findById(id);
  }

  @patch('/product-options/{id}', {
    responses: {
      '204': {
        description: 'ProductOption PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductOption, {partial: true}),
        },
      },
    })
    productOption: ProductOption,
  ): Promise<void> {
    await this.productOptionRepository.updateById(id, productOption);
  }

  @del('/product-options/{id}', {
    responses: {
      '204': {
        description: 'ProductOption DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productOptionRepository.deleteById(id);
  }
}
