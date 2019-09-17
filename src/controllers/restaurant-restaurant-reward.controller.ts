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
  RestaurantReward,
} from '../models';
import {RestaurantRepository} from '../repositories';

export class RestaurantRestaurantRewardController {
  constructor(
    @repository(RestaurantRepository) protected restaurantRepository: RestaurantRepository,
  ) { }

  @get('/restaurants/{id}/restaurant-rewards', {
    responses: {
      '200': {
        description: 'Array of RestaurantReward\'s belonging to Restaurant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RestaurantReward)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RestaurantReward>,
  ): Promise<RestaurantReward[]> {
    return this.restaurantRepository.restaurantRewards(id).find(filter);
  }

  @patch('/restaurants/{id}/restaurant-rewards', {
    responses: {
      '200': {
        description: 'Restaurant.RestaurantReward PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantReward, {partial: true}),
        },
      },
    })
    restaurantReward: Partial<RestaurantReward>,
    @param.query.object('where', getWhereSchemaFor(RestaurantReward)) where?: Where<RestaurantReward>,
  ): Promise<Count> {
    return this.restaurantRepository.restaurantRewards(id).patch(restaurantReward, where);
  }

  @del('/restaurants/{id}/restaurant-rewards', {
    responses: {
      '200': {
        description: 'Restaurant.RestaurantReward DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RestaurantReward)) where?: Where<RestaurantReward>,
  ): Promise<Count> {
    return this.restaurantRepository.restaurantRewards(id).delete(where);
  }
}
