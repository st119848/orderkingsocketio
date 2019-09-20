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
  BankAccount,
} from '../models';
import {BranchRepository} from '../repositories';

export class BranchBankAccountController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository,
  ) { }

  @get('/branches/{id}/bank-accounts', {
    responses: {
      '200': {
        description: 'Array of BankAccount\'s belonging to Branch',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BankAccount)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BankAccount>,
  ): Promise<BankAccount[]> {
    return this.branchRepository.bankAccounts(id).find(filter);
  }

  @patch('/branches/{id}/bank-accounts', {
    responses: {
      '200': {
        description: 'Branch.BankAccount PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BankAccount, {partial: true}),
        },
      },
    })
    bankAccount: Partial<BankAccount>,
    @param.query.object('where', getWhereSchemaFor(BankAccount)) where?: Where<BankAccount>,
  ): Promise<Count> {
    return this.branchRepository.bankAccounts(id).patch(bankAccount, where);
  }

  @del('/branches/{id}/bank-accounts', {
    responses: {
      '200': {
        description: 'Branch.BankAccount DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BankAccount)) where?: Where<BankAccount>,
  ): Promise<Count> {
    return this.branchRepository.bankAccounts(id).delete(where);
  }
}
