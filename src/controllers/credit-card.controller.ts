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
import {CreditCard} from '../models';
import {CreditCardRepository} from '../repositories';

export class CreditCardController {
  constructor(
    @repository(CreditCardRepository)
    public creditCardRepository : CreditCardRepository,
  ) {}

  @post('/credit-cards', {
    responses: {
      '200': {
        description: 'CreditCard model instance',
        content: {'application/json': {schema: getModelSchemaRef(CreditCard)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreditCard, {exclude: ['id']}),
        },
      },
    })
    creditCard: Omit<CreditCard, 'id'>,
  ): Promise<CreditCard> {
    return this.creditCardRepository.create(creditCard);
  }

  @get('/credit-cards', {
    responses: {
      '200': {
        description: 'Array of CreditCard model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CreditCard)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(CreditCard)) filter?: Filter<CreditCard>,
  ): Promise<CreditCard[]> {
    return this.creditCardRepository.find(filter);
  }

  @get('/credit-cards/{id}', {
    responses: {
      '200': {
        description: 'CreditCard model instance',
        content: {'application/json': {schema: getModelSchemaRef(CreditCard)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<CreditCard> {
    return this.creditCardRepository.findById(id);
  }

  @patch('/credit-cards/{id}', {
    responses: {
      '204': {
        description: 'CreditCard PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreditCard, {partial: true}),
        },
      },
    })
    creditCard: CreditCard,
  ): Promise<void> {
    await this.creditCardRepository.updateById(id, creditCard);
  }

  @del('/credit-cards/{id}', {
    responses: {
      '204': {
        description: 'CreditCard DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.creditCardRepository.deleteById(id);
  }
}
