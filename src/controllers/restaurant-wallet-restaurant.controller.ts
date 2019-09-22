import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RestaurantWallet,
  Restaurant,
} from '../models';
import {RestaurantWalletRepository} from '../repositories';

export class RestaurantWalletRestaurantController {
  constructor(
    @repository(RestaurantWalletRepository)
    public restaurantWalletRepository: RestaurantWalletRepository,
  ) { }

  @get('/restaurant-wallets/{id}/restaurant', {
    responses: {
      '200': {
        description: 'Restaurant belonging to RestaurantWallet',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Restaurant)},
          },
        },
      },
    },
  })
  async getRestaurant(
    @param.path.number('id') id: typeof RestaurantWallet.prototype.id,
  ): Promise<Restaurant> {
    return this.restaurantWalletRepository.restaurant(id);
  }
}
