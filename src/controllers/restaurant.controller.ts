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
import {Restaurant} from '../models';
import {RestaurantRepository} from '../repositories';

export class RestaurantController {
  constructor(
    @repository(RestaurantRepository)
    public restaurantRepository : RestaurantRepository,
  ) {}

  @post('/restaurants', {
    responses: {
      '200': {
        description: 'Restaurant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Restaurant)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurant, {exclude: ['id']}),
        },
      },
    })
    restaurant: Omit<Restaurant, 'id'>,
  ): Promise<Restaurant> {
    return this.restaurantRepository.create(restaurant);
  }

  @get('/restaurants/count', {
    responses: {
      '200': {
        description: 'Restaurant model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Restaurant)) where?: Where<Restaurant>,
  ): Promise<Count> {
    return this.restaurantRepository.count(where);
  }

  @get('/restaurants', {
    responses: {
      '200': {
        description: 'Array of Restaurant model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Restaurant)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Restaurant)) filter?: Filter<Restaurant>,
  ): Promise<Restaurant[]> {
    return this.restaurantRepository.find(filter);
  }

  @patch('/restaurants', {
    responses: {
      '200': {
        description: 'Restaurant PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurant, {partial: true}),
        },
      },
    })
    restaurant: Restaurant,
    @param.query.object('where', getWhereSchemaFor(Restaurant)) where?: Where<Restaurant>,
  ): Promise<Count> {
    return this.restaurantRepository.updateAll(restaurant, where);
  }

  @get('/restaurants/{id}', {
    responses: {
      '200': {
        description: 'Restaurant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Restaurant)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Restaurant> {
    return this.restaurantRepository.findById(id);
  }

  @patch('/restaurants/{id}', {
    responses: {
      '204': {
        description: 'Restaurant PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurant, {partial: true}),
        },
      },
    })
    restaurant: Restaurant,
  ): Promise<void> {
    await this.restaurantRepository.updateById(id, restaurant);
  }

  @put('/restaurants/{id}', {
    responses: {
      '204': {
        description: 'Restaurant PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() restaurant: Restaurant,
  ): Promise<void> {
    await this.restaurantRepository.replaceById(id, restaurant);
  }

  @del('/restaurants/{id}', {
    responses: {
      '204': {
        description: 'Restaurant DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.restaurantRepository.deleteById(id);
  }
}
