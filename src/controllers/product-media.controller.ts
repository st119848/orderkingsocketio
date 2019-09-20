import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {ProductMedia} from '../models';
import {ProductMediaRepository} from '../repositories';

export class ProductMediaController {
  constructor(
    @repository(ProductMediaRepository)
    public productMediaRepository : ProductMediaRepository,
  ) {}

  @post('/product-medias', {
    responses: {
      '200': {
        description: 'ProductMedia model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductMedia)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductMedia, {exclude: ['id']}),
        },
      },
    })
    productMedia: Omit<ProductMedia, 'id'>,
  ): Promise<ProductMedia> {
    return this.productMediaRepository.create(productMedia);
  }

  @get('/product-medias', {
    responses: {
      '200': {
        description: 'Array of ProductMedia model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductMedia)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ProductMedia)) filter?: Filter<ProductMedia>,
  ): Promise<ProductMedia[]> {
    return this.productMediaRepository.find(filter);
  }

  @get('/product-medias/{id}', {
    responses: {
      '200': {
        description: 'ProductMedia model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductMedia)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ProductMedia> {
    return this.productMediaRepository.findById(id);
  }

  @patch('/product-medias/{id}', {
    responses: {
      '204': {
        description: 'ProductMedia PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductMedia, {partial: true}),
        },
      },
    })
    productMedia: ProductMedia,
  ): Promise<void> {
    await this.productMediaRepository.updateById(id, productMedia);
  }

  @del('/product-medias/{id}', {
    responses: {
      '204': {
        description: 'ProductMedia DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productMediaRepository.deleteById(id);
  }
}
