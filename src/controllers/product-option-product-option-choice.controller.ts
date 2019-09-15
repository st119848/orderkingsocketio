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
  ProductOption,
  ProductOptionChoice,
} from '../models';
import {ProductOptionRepository} from '../repositories';

export class ProductOptionProductOptionChoiceController {
  constructor(
    @repository(ProductOptionRepository) protected productOptionRepository: ProductOptionRepository,
  ) { }

  @get('/product-options/{id}/product-option-choices', {
    responses: {
      '200': {
        description: 'Array of ProductOptionChoice\'s belonging to ProductOption',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductOptionChoice)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProductOptionChoice>,
  ): Promise<ProductOptionChoice[]> {
    return this.productOptionRepository.productOptionChoices(id).find(filter);
  }

  @post('/product-options/{id}/product-option-choices', {
    responses: {
      '200': {
        description: 'ProductOption model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductOptionChoice)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ProductOption.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductOptionChoice, {
            exclude: ['id'],
            optional: ['productOptionId']
          }),
        },
      },
    }) productOptionChoice: Omit<ProductOptionChoice, 'id'>,
  ): Promise<ProductOptionChoice> {
    return this.productOptionRepository.productOptionChoices(id).create(productOptionChoice);
  }

  @patch('/product-options/{id}/product-option-choices', {
    responses: {
      '200': {
        description: 'ProductOption.ProductOptionChoice PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductOptionChoice, {partial: true}),
        },
      },
    })
    productOptionChoice: Partial<ProductOptionChoice>,
    @param.query.object('where', getWhereSchemaFor(ProductOptionChoice)) where?: Where<ProductOptionChoice>,
  ): Promise<Count> {
    return this.productOptionRepository.productOptionChoices(id).patch(productOptionChoice, where);
  }

  @del('/product-options/{id}/product-option-choices', {
    responses: {
      '200': {
        description: 'ProductOption.ProductOptionChoice DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProductOptionChoice)) where?: Where<ProductOptionChoice>,
  ): Promise<Count> {
    return this.productOptionRepository.productOptionChoices(id).delete(where);
  }
}
