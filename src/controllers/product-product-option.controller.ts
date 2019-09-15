import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Product,
  ProductOption,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductOptionController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/product-options', {
    responses: {
      '200': {
        description: 'Array of ProductOption\'s belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductOption)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProductOption>,
  ): Promise<ProductOption[]> {
    return this.productRepository.productOptions(id).find(filter);
  }

  @post('/products/{id}/product-options', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductOption)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductOption, {
            exclude: ['id'],
            optional: ['productId']
          }),
        },
      },
    }) productOption: Omit<ProductOption, 'id'>,
  ): Promise<ProductOption> {
    return this.productRepository.productOptions(id).create(productOption);
  }

  @patch('/products/{id}/product-options', {
    responses: {
      '200': {
        description: 'Product.ProductOption PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductOption, {partial: true}),
        },
      },
    })
    productOption: Partial<ProductOption>,
    @param.query.object('where', getWhereSchemaFor(ProductOption)) where?: Where<ProductOption>,
  ): Promise<Count> {
    return this.productRepository.productOptions(id).patch(productOption, where);
  }

  @del('/products/{id}/product-options', {
    responses: {
      '200': {
        description: 'Product.ProductOption DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProductOption)) where?: Where<ProductOption>,
  ): Promise<Count> {
    return this.productRepository.productOptions(id).delete(where);
  }
}
