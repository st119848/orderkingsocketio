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
import {Driver, User} from '../models';
import {DriverRepository} from '../repositories';

export class DriverController {
  constructor(
    @repository(DriverRepository) protected driverRepository : DriverRepository,
  ) {}

  @get('/driver/{id}/users')
  async getUser(
    @param.path.number('id') driverId: typeof Driver.prototype.id,
  ): Promise<User> {
    return this.driverRepository.user(driverId);
  }

  @post('/drivers', {
    responses: {
      '200': {
        description: 'Driver model instance',
        content: {'application/json': {schema: getModelSchemaRef(Driver)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Driver, {exclude: ['id']}),
        },
      },
    })
    driver: Omit<Driver, 'id'>,
  ): Promise<Driver> {
    return this.driverRepository.create(driver);
  }

  @get('/drivers/count', {
    responses: {
      '200': {
        description: 'Driver model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Driver)) where?: Where<Driver>,
  ): Promise<Count> {
    return this.driverRepository.count(where);
  }

  @get('/drivers', {
    responses: {
      '200': {
        description: 'Array of Driver model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Driver)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Driver)) filter?: Filter<Driver>,
  ): Promise<Driver[]> {
    return this.driverRepository.find(filter);
  }

  @patch('/drivers', {
    responses: {
      '200': {
        description: 'Driver PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Driver, {partial: true}),
        },
      },
    })
    driver: Driver,
    @param.query.object('where', getWhereSchemaFor(Driver)) where?: Where<Driver>,
  ): Promise<Count> {
    return this.driverRepository.updateAll(driver, where);
  }

  @get('/drivers/{id}', {
    responses: {
      '200': {
        description: 'Driver model instance',
        content: {'application/json': {schema: getModelSchemaRef(Driver)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Driver> {
    return this.driverRepository.findById(id);
  }

  @patch('/drivers/{id}', {
    responses: {
      '204': {
        description: 'Driver PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Driver, {partial: true}),
        },
      },
    })
    driver: Driver,
  ): Promise<void> {
    await this.driverRepository.updateById(id, driver);
  }

  @put('/drivers/{id}', {
    responses: {
      '204': {
        description: 'Driver PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() driver: Driver,
  ): Promise<void> {
    await this.driverRepository.replaceById(id, driver);
  }

  @del('/drivers/{id}', {
    responses: {
      '204': {
        description: 'Driver DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.driverRepository.deleteById(id);
  }
}
