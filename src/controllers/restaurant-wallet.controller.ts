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
import {RestaurantWallet} from '../models';
import {RestaurantWalletRepository} from '../repositories';

export class RestaurantWalletController {
  constructor(
    @repository(RestaurantWalletRepository)
    public restaurantWalletRepository : RestaurantWalletRepository,
  ) {}

  @post('/restaurant-wallets', {
    responses: {
      '200': {
        description: 'RestaurantWallet model instance',
        content: {'application/json': {schema: getModelSchemaRef(RestaurantWallet)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantWallet, {exclude: ['id']}),
        },
      },
    })
    restaurantWallet: Omit<RestaurantWallet, 'id'>,
  ): Promise<RestaurantWallet> {
    return this.restaurantWalletRepository.create(restaurantWallet);
  }

  @get('/restaurant-wallets', {
    responses: {
      '200': {
        description: 'Array of RestaurantWallet model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RestaurantWallet)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(RestaurantWallet)) filter?: Filter<RestaurantWallet>,
  ): Promise<RestaurantWallet[]> {
    return this.restaurantWalletRepository.find(filter);
  }

  @get('/restaurant-wallets/{id}', {
    responses: {
      '200': {
        description: 'RestaurantWallet model instance',
        content: {'application/json': {schema: getModelSchemaRef(RestaurantWallet)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<RestaurantWallet> {
    return this.restaurantWalletRepository.findById(id);
  }

  @del('/restaurant-wallets/{id}', {
    responses: {
      '204': {
        description: 'RestaurantWallet DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.restaurantWalletRepository.deleteById(id);
  }
}
