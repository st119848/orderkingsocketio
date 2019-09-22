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
  RestaurantWallet,
  RestaurantTransactionHistory,
} from '../models';
import {RestaurantWalletRepository} from '../repositories';

export class RestaurantWalletRestaurantTransactionHistoryController {
  constructor(
    @repository(RestaurantWalletRepository) protected restaurantWalletRepository: RestaurantWalletRepository,
  ) { }

  @get('/restaurant-wallets/{id}/restaurant-transaction-histories', {
    responses: {
      '200': {
        description: 'Array of RestaurantTransactionHistory\'s belonging to RestaurantWallet',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RestaurantTransactionHistory)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RestaurantTransactionHistory>,
  ): Promise<RestaurantTransactionHistory[]> {
    return this.restaurantWalletRepository.restaurantTransactionHistories(id).find(filter);
  }

  @del('/restaurant-wallets/{id}/restaurant-transaction-histories', {
    responses: {
      '200': {
        description: 'RestaurantWallet.RestaurantTransactionHistory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RestaurantTransactionHistory)) where?: Where<RestaurantTransactionHistory>,
  ): Promise<Count> {
    return this.restaurantWalletRepository.restaurantTransactionHistories(id).delete(where);
  }
}
