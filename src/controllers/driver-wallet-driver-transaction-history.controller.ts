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
  DriverWallet,
  DriverTransactionHistory,
} from '../models';
import {DriverWalletRepository} from '../repositories';

export class DriverWalletDriverTransactionHistoryController {
  constructor(
    @repository(DriverWalletRepository) protected driverWalletRepository: DriverWalletRepository,
  ) { }

  @get('/driver-wallets/{id}/driver-transaction-histories', {
    responses: {
      '200': {
        description: 'Array of DriverTransactionHistory\'s belonging to DriverWallet',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DriverTransactionHistory)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DriverTransactionHistory>,
  ): Promise<DriverTransactionHistory[]> {
    return this.driverWalletRepository.driverTransactionHistories(id).find(filter);
  }

  @patch('/driver-wallets/{id}/driver-transaction-histories', {
    responses: {
      '200': {
        description: 'DriverWallet.DriverTransactionHistory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DriverTransactionHistory, {partial: true}),
        },
      },
    })
    driverTransactionHistory: Partial<DriverTransactionHistory>,
    @param.query.object('where', getWhereSchemaFor(DriverTransactionHistory)) where?: Where<DriverTransactionHistory>,
  ): Promise<Count> {
    return this.driverWalletRepository.driverTransactionHistories(id).patch(driverTransactionHistory, where);
  }

  @del('/driver-wallets/{id}/driver-transaction-histories', {
    responses: {
      '200': {
        description: 'DriverWallet.DriverTransactionHistory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DriverTransactionHistory)) where?: Where<DriverTransactionHistory>,
  ): Promise<Count> {
    return this.driverWalletRepository.driverTransactionHistories(id).delete(where);
  }
}
