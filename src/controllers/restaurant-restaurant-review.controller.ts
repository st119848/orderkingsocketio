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
  Restaurant,
  RestaurantReview,
} from '../models';
import {RestaurantRepository} from '../repositories';

export class RestaurantRestaurantReviewController {
  constructor(
    @repository(RestaurantRepository) protected restaurantRepository: RestaurantRepository,
  ) { }

  @get('/restaurants/{id}/restaurant-reviews', {
    responses: {
      '200': {
        description: 'Array of RestaurantReview\'s belonging to Restaurant',
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
    return this.restaurantRepository.restaurantReviews(id).find(filter);
  }

  @patch('/restaurants/{id}/restaurant-reviews', {
    responses: {
      '200': {
        description: 'Restaurant.RestaurantReview PATCH success count',
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
    return this.restaurantRepository.restaurantReviews(id).patch(restaurantReview, where);
  }

  @del('/restaurants/{id}/restaurant-reviews', {
    responses: {
      '200': {
        description: 'Restaurant.RestaurantReview DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RestaurantReview)) where?: Where<RestaurantReview>,
  ): Promise<Count> {
    return this.restaurantRepository.restaurantReviews(id).delete(where);
  }
}
