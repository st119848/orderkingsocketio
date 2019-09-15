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
  Branch,
} from '../models';
import {RestaurantRepository} from '../repositories';

export class RestaurantBranchController {
  constructor(
    @repository(RestaurantRepository) protected restaurantRepository: RestaurantRepository,
  ) { }

  @get('/restaurants/{id}/branches', {
    responses: {
      '200': {
        description: 'Array of Branch\'s belonging to Restaurant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Branch)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Branch>,
  ): Promise<Branch[]> {
    return this.restaurantRepository.branches(id).find(filter);
  }

  @post('/restaurants/{id}/branches', {
    responses: {
      '200': {
        description: 'Restaurant model instance',
        content: {'application/json': {schema: getModelSchemaRef(Branch)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Restaurant.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Branch, {
            exclude: ['id'],
            optional: ['restaurantId']
          }),
        },
      },
    }) branch: Omit<Branch, 'id'>,
  ): Promise<Branch> {
    return this.restaurantRepository.branches(id).create(branch);
  }

  @patch('/restaurants/{id}/branches', {
    responses: {
      '200': {
        description: 'Restaurant.Branch PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Branch, {partial: true}),
        },
      },
    })
    branch: Partial<Branch>,
    @param.query.object('where', getWhereSchemaFor(Branch)) where?: Where<Branch>,
  ): Promise<Count> {
    return this.restaurantRepository.branches(id).patch(branch, where);
  }

  @del('/restaurants/{id}/branches', {
    responses: {
      '200': {
        description: 'Restaurant.Branch DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Branch)) where?: Where<Branch>,
  ): Promise<Count> {
    return this.restaurantRepository.branches(id).delete(where);
  }
}
