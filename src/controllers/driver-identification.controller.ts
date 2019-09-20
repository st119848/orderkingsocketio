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
import {DriverIdentification} from '../models';
import {DriverIdentificationRepository} from '../repositories';

export class DriverIdentificationController {
  constructor(
    @repository(DriverIdentificationRepository)
    public driverIdentificationRepository : DriverIdentificationRepository,
  ) {}

  @post('/driver-identifications', {
    responses: {
      '200': {
        description: 'DriverIdentification model instance',
        content: {'application/json': {schema: getModelSchemaRef(DriverIdentification)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DriverIdentification, {exclude: ['id']}),
        },
      },
    })
    driverIdentification: Omit<DriverIdentification, 'id'>,
  ): Promise<DriverIdentification> {
    return this.driverIdentificationRepository.create(driverIdentification);
  }

  @get('/driver-identifications', {
    responses: {
      '200': {
        description: 'Array of DriverIdentification model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DriverIdentification)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(DriverIdentification)) filter?: Filter<DriverIdentification>,
  ): Promise<DriverIdentification[]> {
    return this.driverIdentificationRepository.find(filter);
  }

  @get('/driver-identifications/{id}', {
    responses: {
      '200': {
        description: 'DriverIdentification model instance',
        content: {'application/json': {schema: getModelSchemaRef(DriverIdentification)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<DriverIdentification> {
    return this.driverIdentificationRepository.findById(id);
  }

  @patch('/driver-identifications/{id}', {
    responses: {
      '204': {
        description: 'DriverIdentification PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DriverIdentification, {partial: true}),
        },
      },
    })
    driverIdentification: DriverIdentification,
  ): Promise<void> {
    await this.driverIdentificationRepository.updateById(id, driverIdentification);
  }

  @del('/driver-identifications/{id}', {
    responses: {
      '204': {
        description: 'DriverIdentification DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.driverIdentificationRepository.deleteById(id);
  }
}
