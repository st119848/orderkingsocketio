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
import {DriverTransactionHistory} from '../models';
import {DriverTransactionHistoryRepository} from '../repositories';

export class DriverTransactionHistoryController {
  constructor(
    @repository(DriverTransactionHistoryRepository)
    public driverTransactionHistoryRepository : DriverTransactionHistoryRepository,
  ) {}

  @post('/driver-transaction-histories', {
    responses: {
      '200': {
        description: 'DriverTransactionHistory model instance',
        content: {'application/json': {schema: getModelSchemaRef(DriverTransactionHistory)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DriverTransactionHistory, {exclude: ['id']}),
        },
      },
    })
    driverTransactionHistory: Omit<DriverTransactionHistory, 'id'>,
  ): Promise<DriverTransactionHistory> {
    return this.driverTransactionHistoryRepository.create(driverTransactionHistory);
  }

  @get('/driver-transaction-histories', {
    responses: {
      '200': {
        description: 'Array of DriverTransactionHistory model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DriverTransactionHistory)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(DriverTransactionHistory)) filter?: Filter<DriverTransactionHistory>,
  ): Promise<DriverTransactionHistory[]> {
    return this.driverTransactionHistoryRepository.find(filter);
  }

  @get('/driver-transaction-histories/{id}', {
    responses: {
      '200': {
        description: 'DriverTransactionHistory model instance',
        content: {'application/json': {schema: getModelSchemaRef(DriverTransactionHistory)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<DriverTransactionHistory> {
    return this.driverTransactionHistoryRepository.findById(id);
  }

  @del('/driver-transaction-histories/{id}', {
    responses: {
      '204': {
        description: 'DriverTransactionHistory DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.driverTransactionHistoryRepository.deleteById(id);
  }
}
