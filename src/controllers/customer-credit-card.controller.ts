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
  Customer,
  CreditCard,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerCreditCardController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/credit-cards', {
    responses: {
      '200': {
        description: 'Array of CreditCard\'s belonging to Customer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CreditCard)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CreditCard>,
  ): Promise<CreditCard[]> {
    return this.customerRepository.creditCards(id).find(filter);
  }

  @patch('/customers/{id}/credit-cards', {
    responses: {
      '200': {
        description: 'Customer.CreditCard PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreditCard, {partial: true}),
        },
      },
    })
    creditCard: Partial<CreditCard>,
    @param.query.object('where', getWhereSchemaFor(CreditCard)) where?: Where<CreditCard>,
  ): Promise<Count> {
    return this.customerRepository.creditCards(id).patch(creditCard, where);
  }

  @del('/customers/{id}/credit-cards', {
    responses: {
      '200': {
        description: 'Customer.CreditCard DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CreditCard)) where?: Where<CreditCard>,
  ): Promise<Count> {
    return this.customerRepository.creditCards(id).delete(where);
  }
}
