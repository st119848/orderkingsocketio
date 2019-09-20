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
import {BankAccount} from '../models';
import {BankAccountRepository} from '../repositories';

export class BankAccountController {
  constructor(
    @repository(BankAccountRepository)
    public bankAccountRepository : BankAccountRepository,
  ) {}

  @post('/bank-accounts', {
    responses: {
      '200': {
        description: 'BankAccount model instance',
        content: {'application/json': {schema: getModelSchemaRef(BankAccount)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BankAccount, {exclude: ['id']}),
        },
      },
    })
    bankAccount: Omit<BankAccount, 'id'>,
  ): Promise<BankAccount> {
    return this.bankAccountRepository.create(bankAccount);
  }

  @get('/bank-accounts', {
    responses: {
      '200': {
        description: 'Array of BankAccount model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BankAccount)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(BankAccount)) filter?: Filter<BankAccount>,
  ): Promise<BankAccount[]> {
    return this.bankAccountRepository.find(filter);
  }

  @get('/bank-accounts/{id}', {
    responses: {
      '200': {
        description: 'BankAccount model instance',
        content: {'application/json': {schema: getModelSchemaRef(BankAccount)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<BankAccount> {
    return this.bankAccountRepository.findById(id);
  }

  @patch('/bank-accounts/{id}', {
    responses: {
      '204': {
        description: 'BankAccount PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BankAccount, {partial: true}),
        },
      },
    })
    bankAccount: BankAccount,
  ): Promise<void> {
    await this.bankAccountRepository.updateById(id, bankAccount);
  }

  @del('/bank-accounts/{id}', {
    responses: {
      '204': {
        description: 'BankAccount DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bankAccountRepository.deleteById(id);
  }
}
