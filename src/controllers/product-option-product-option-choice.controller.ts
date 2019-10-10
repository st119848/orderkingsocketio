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
