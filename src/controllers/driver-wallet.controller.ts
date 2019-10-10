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
import {DriverWallet} from '../models';
import {DriverWalletRepository} from '../repositories';

export class DriverWalletController {
  constructor(
    @repository(DriverWalletRepository)
    public driverWalletRepository : DriverWalletRepository,
  ) {}

  @post('/driver-wallets', {
    responses: {
      '200': {
        description: 'DriverWallet model instance',
        content: {'application/json': {schema: getModelSchemaRef(DriverWallet)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DriverWallet, {exclude: ['id']}),
        },
      },
    })
    driverWallet: Omit<DriverWallet, 'id'>,
  ): Promise<DriverWallet> {
    return this.driverWalletRepository.create(driverWallet);
  }

  @get('/driver-wallets', {
    responses: {
      '200': {
        description: 'Array of DriverWallet model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DriverWallet)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(DriverWallet)) filter?: Filter<DriverWallet>,
  ): Promise<DriverWallet[]> {
    return this.driverWalletRepository.find(filter);
  }

  @get('/driver-wallets/{id}', {
    responses: {
      '200': {
        description: 'DriverWallet model instance',
        content: {'application/json': {schema: getModelSchemaRef(DriverWallet)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<DriverWallet> {
    return this.driverWalletRepository.findById(id);
  }

  @del('/driver-wallets/{id}', {
    responses: {
      '204': {
        description: 'DriverWallet DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.driverWalletRepository.deleteById(id);
  }
}
