import {
  Filter,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {RestaurantReward} from '../models';
import {RestaurantRewardRepository} from '../repositories';

export class RestaurantRewardController {
  constructor(
    @repository(RestaurantRewardRepository)
    public restaurantRewardRepository : RestaurantRewardRepository,
  ) {}

  @post('/restaurant-rewards', {
    responses: {
      '200': {
        description: 'RestaurantReward model instance',
        content: {'application/json': {schema: getModelSchemaRef(RestaurantReward)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantReward, {exclude: ['id']}),
        },
      },
    })
    restaurantReward: Omit<RestaurantReward, 'id'>,
  ): Promise<RestaurantReward> {
    return this.restaurantRewardRepository.create(restaurantReward);
  }

  @get('/restaurant-rewards', {
    responses: {
      '200': {
        description: 'Array of RestaurantReward model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RestaurantReward)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(RestaurantReward)) filter?: Filter<RestaurantReward>,
  ): Promise<RestaurantReward[]> {
    return this.restaurantRewardRepository.find(filter);
  }

  @get('/restaurant-rewards/{id}', {
    responses: {
      '200': {
        description: 'RestaurantReward model instance',
        content: {'application/json': {schema: getModelSchemaRef(RestaurantReward)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<RestaurantReward> {
    return this.restaurantRewardRepository.findById(id);
  }

  @patch('/restaurant-rewards/{id}', {
    responses: {
      '204': {
        description: 'RestaurantReward PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantReward, {partial: true}),
        },
      },
    })
    restaurantReward: RestaurantReward,
  ): Promise<void> {
    await this.restaurantRewardRepository.updateById(id, restaurantReward);
  }

  @del('/restaurant-rewards/{id}', {
    responses: {
      '204': {
        description: 'RestaurantReward DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.restaurantRewardRepository.deleteById(id);
  }
}
