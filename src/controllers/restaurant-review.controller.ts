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
import {RestaurantReview} from '../models';
import {RestaurantReviewRepository} from '../repositories';

export class RestaurantReviewController {
  constructor(
    @repository(RestaurantReviewRepository)
    public restaurantReviewRepository : RestaurantReviewRepository,
  ) {}

  @post('/restaurant-reviews', {
    responses: {
      '200': {
        description: 'RestaurantReview model instance',
        content: {'application/json': {schema: getModelSchemaRef(RestaurantReview)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantReview, {exclude: ['id']}),
        },
      },
    })
    restaurantReview: Omit<RestaurantReview, 'id'>,
  ): Promise<RestaurantReview> {
    return this.restaurantReviewRepository.create(restaurantReview);
  }

  @get('/restaurant-reviews', {
    responses: {
      '200': {
        description: 'Array of RestaurantReview model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RestaurantReview)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(RestaurantReview)) filter?: Filter<RestaurantReview>,
  ): Promise<RestaurantReview[]> {
    return this.restaurantReviewRepository.find(filter);
  }

  @get('/restaurant-reviews/{id}', {
    responses: {
      '200': {
        description: 'RestaurantReview model instance',
        content: {'application/json': {schema: getModelSchemaRef(RestaurantReview)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<RestaurantReview> {
    return this.restaurantReviewRepository.findById(id);
  }

  @patch('/restaurant-reviews/{id}', {
    responses: {
      '204': {
        description: 'RestaurantReview PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantReview, {partial: true}),
        },
      },
    })
    restaurantReview: RestaurantReview,
  ): Promise<void> {
    await this.restaurantReviewRepository.updateById(id, restaurantReview);
  }

  @del('/restaurant-reviews/{id}', {
    responses: {
      '204': {
        description: 'RestaurantReview DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.restaurantReviewRepository.deleteById(id);
  }
}
