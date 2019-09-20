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
  requestBody,
} from '@loopback/rest';
import {
  ProductMedia,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductProductMediaController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/product-medias', {
    responses: {
      '200': {
        description: 'Array of ProductMedia\'s belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductMedia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProductMedia>,
  ): Promise<ProductMedia[]> {
    return this.productRepository.productMedias(id).find(filter);
  }

  @patch('/products/{id}/product-medias', {
    responses: {
      '200': {
        description: 'Product.ProductMedia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductMedia, {partial: true}),
        },
      },
    })
    productMedia: Partial<ProductMedia>,
    @param.query.object('where', getWhereSchemaFor(ProductMedia)) where?: Where<ProductMedia>,
  ): Promise<Count> {
    return this.productRepository.productMedias(id).patch(productMedia, where);
  }

  @del('/products/{id}/product-medias', {
    responses: {
      '200': {
        description: 'Product.ProductMedia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProductMedia)) where?: Where<ProductMedia>,
  ): Promise<Count> {
    return this.productRepository.productMedias(id).delete(where);
  }
}
