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
  Driver,
} from '../models';
import {UserRepository} from '../repositories';

export class UserDriverController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/drivers', {
    responses: {
      '200': {
        description: 'Array of Driver\'s belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Driver)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Driver>,
  ): Promise<Driver[]> {
    return this.userRepository.drivers(id).find(filter);
  }

  @patch('/users/{id}/drivers', {
    responses: {
      '200': {
        description: 'User.Driver PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Driver, {partial: true}),
        },
      },
    })
    driver: Partial<Driver>,
    @param.query.object('where', getWhereSchemaFor(Driver)) where?: Where<Driver>,
  ): Promise<Count> {
    return this.userRepository.drivers(id).patch(driver, where);
  }

  @del('/users/{id}/drivers', {
    responses: {
      '200': {
        description: 'User.Driver DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Driver)) where?: Where<Driver>,
  ): Promise<Count> {
    return this.userRepository.drivers(id).delete(where);
  }
}
