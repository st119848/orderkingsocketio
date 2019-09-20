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
import {Driver} from '../models';
import {DriverRepository} from '../repositories';

export class DriverController {
  constructor(
    @repository(DriverRepository)
    public driverRepository : DriverRepository,
  ) {}

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
