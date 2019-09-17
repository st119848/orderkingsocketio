import {
  Filter,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Station} from '../models';
import {StationRepository} from '../repositories';

export class StationController {
  constructor(
    @repository(StationRepository)
    public stationRepository : StationRepository,
  ) {}

  @post('/stations', {
    responses: {
      '200': {
        description: 'Station model instance',
        content: {'application/json': {schema: getModelSchemaRef(Station)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Station, {exclude: ['id']}),
        },
      },
    })
    station: Omit<Station, 'id'>,
  ): Promise<Station> {
    return this.stationRepository.create(station);
  }

  @get('/stations', {
    responses: {
      '200': {
        description: 'Array of Station model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Station)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Station)) filter?: Filter<Station>,
  ): Promise<Station[]> {
    return this.stationRepository.find(filter);
  }

  @get('/stations/{id}', {
    responses: {
      '200': {
        description: 'Station model instance',
        content: {'application/json': {schema: getModelSchemaRef(Station)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Station> {
    return this.stationRepository.findById(id);
  }

  @patch('/stations/{id}', {
    responses: {
      '204': {
        description: 'Station PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Station, {partial: true}),
        },
      },
    })
    station: Station,
  ): Promise<void> {
    await this.stationRepository.updateById(id, station);
  }

  @del('/stations/{id}', {
    responses: {
      '204': {
        description: 'Station DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.stationRepository.deleteById(id);
  }
}
