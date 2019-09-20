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
  Branch,
  CreditCard,
} from '../models';
import {BranchRepository} from '../repositories';

export class BranchCreditCardController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository,
  ) { }

  @get('/branches/{id}/credit-cards', {
    responses: {
      '200': {
        description: 'Array of CreditCard\'s belonging to Branch',
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
    return this.branchRepository.creditCards(id).find(filter);
  }

  @patch('/branches/{id}/credit-cards', {
    responses: {
      '200': {
        description: 'Branch.CreditCard PATCH success count',
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
    return this.branchRepository.creditCards(id).patch(creditCard, where);
  }

  @del('/branches/{id}/credit-cards', {
    responses: {
      '200': {
        description: 'Branch.CreditCard DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CreditCard)) where?: Where<CreditCard>,
  ): Promise<Count> {
    return this.branchRepository.creditCards(id).delete(where);
  }
}
