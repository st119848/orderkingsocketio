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
  BankAccount,
} from '../models';
import {DriverRepository} from '../repositories';

export class DriverBankAccountController {
  constructor(
    @repository(DriverRepository) protected driverRepository: DriverRepository,
  ) { }

  @get('/drivers/{id}/bank-accounts', {
    responses: {
      '200': {
        description: 'Array of BankAccount\'s belonging to Driver',
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
    return this.driverRepository.bankAccounts(id).find(filter);
  }

  @patch('/drivers/{id}/bank-accounts', {
    responses: {
      '200': {
        description: 'Driver.BankAccount PATCH success count',
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
    return this.driverRepository.bankAccounts(id).patch(bankAccount, where);
  }

  @del('/drivers/{id}/bank-accounts', {
    responses: {
      '200': {
        description: 'Driver.BankAccount DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BankAccount)) where?: Where<BankAccount>,
  ): Promise<Count> {
    return this.driverRepository.bankAccounts(id).delete(where);
  }
}
