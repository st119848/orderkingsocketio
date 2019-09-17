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
import {Product} from '../models';
import {ProductRepository} from '../repositories';

export class ProductController {
  constructor(
    @repository(ProductRepository)
    public productRepository : ProductRepository,
  ) {}

  @post('/products', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {exclude: ['id']}),
        },
      },
    })
    product: Omit<Product, 'id'>,
  ): Promise<Product> {
    return this.productRepository.create(product);
  }

  @get('/products', {
    responses: {
      '200': {
        description: 'Array of Product model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Product)) filter?: Filter<Product>,
  ): Promise<Product[]> {
    return this.productRepository.find(filter);
  }

  @get('/products/{id}', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Product> {
    return this.productRepository.findById(id);
  }

  @patch('/products/{id}', {
    responses: {
      '204': {
        description: 'Product PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Product,
  ): Promise<void> {
    await this.productRepository.updateById(id, product);
  }

  @del('/products/{id}', {
    responses: {
      '204': {
        description: 'Product DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productRepository.deleteById(id);
  }
}
