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
import {RestaurantTransactionHistory} from '../models';
import {RestaurantTransactionHistoryRepository} from '../repositories';

export class RestaurantTransactionHistoryController {
  constructor(
    @repository(RestaurantTransactionHistoryRepository)
    public restaurantTransactionHistoryRepository : RestaurantTransactionHistoryRepository,
  ) {}

  @post('/restaurant-transaction-histories', {
    responses: {
      '200': {
        description: 'RestaurantTransactionHistory model instance',
        content: {'application/json': {schema: getModelSchemaRef(RestaurantTransactionHistory)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RestaurantTransactionHistory, {exclude: ['id']}),
        },
      },
    })
    restaurantTransactionHistory: Omit<RestaurantTransactionHistory, 'id'>,
  ): Promise<RestaurantTransactionHistory> {
    return this.restaurantTransactionHistoryRepository.create(restaurantTransactionHistory);
  }

  @get('/restaurant-transaction-histories', {
    responses: {
      '200': {
        description: 'Array of RestaurantTransactionHistory model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RestaurantTransactionHistory)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(RestaurantTransactionHistory)) filter?: Filter<RestaurantTransactionHistory>,
  ): Promise<RestaurantTransactionHistory[]> {
    return this.restaurantTransactionHistoryRepository.find(filter);
  }

  @get('/restaurant-transaction-histories/{id}', {
    responses: {
      '200': {
        description: 'RestaurantTransactionHistory model instance',
        content: {'application/json': {schema: getModelSchemaRef(RestaurantTransactionHistory)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<RestaurantTransactionHistory> {
    return this.restaurantTransactionHistoryRepository.findById(id);
  }

  @del('/restaurant-transaction-histories/{id}', {
    responses: {
      '204': {
        description: 'RestaurantTransactionHistory DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.restaurantTransactionHistoryRepository.deleteById(id);
  }
}
