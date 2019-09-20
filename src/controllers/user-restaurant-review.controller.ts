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
  User,
  RestaurantReview,
} from '../models';
import {UserRepository} from '../repositories';

export class UserRestaurantReviewController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/restaurant-reviews', {
    responses: {
      '200': {
        description: 'Array of RestaurantReview\'s belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RestaurantReview)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RestaurantReview>,
  ): Promise<RestaurantReview[]> {
    return this.userRepository.restaurantReviews(id).find(filter);
  }

  @patch('/users/{id}/restaurant-reviews', {
    responses: {
      '200': {
        description: 'User.RestaurantReview PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantReview, {partial: true}),
        },
      },
    })
    restaurantReview: Partial<RestaurantReview>,
    @param.query.object('where', getWhereSchemaFor(RestaurantReview)) where?: Where<RestaurantReview>,
  ): Promise<Count> {
    return this.userRepository.restaurantReviews(id).patch(restaurantReview, where);
  }

  @del('/users/{id}/restaurant-reviews', {
    responses: {
      '200': {
        description: 'User.RestaurantReview DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RestaurantReview)) where?: Where<RestaurantReview>,
  ): Promise<Count> {
    return this.userRepository.restaurantReviews(id).delete(where);
  }
}
