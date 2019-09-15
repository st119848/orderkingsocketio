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
  Branch,
  Station,
} from '../models';
import {BranchRepository} from '../repositories';

export class BranchStationController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository,
  ) { }

  @get('/branches/{id}/stations', {
    responses: {
      '200': {
        description: 'Array of Station\'s belonging to Branch',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Station)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Station>,
  ): Promise<Station[]> {
    return this.branchRepository.stations(id).find(filter);
  }

  @post('/branches/{id}/stations', {
    responses: {
      '200': {
        description: 'Branch model instance',
        content: {'application/json': {schema: getModelSchemaRef(Station)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Branch.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Station, {
            exclude: ['id'],
            optional: ['branchId']
          }),
        },
      },
    }) station: Omit<Station, 'id'>,
  ): Promise<Station> {
    return this.branchRepository.stations(id).create(station);
  }

  @patch('/branches/{id}/stations', {
    responses: {
      '200': {
        description: 'Branch.Station PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Station, {partial: true}),
        },
      },
    })
    station: Partial<Station>,
    @param.query.object('where', getWhereSchemaFor(Station)) where?: Where<Station>,
  ): Promise<Count> {
    return this.branchRepository.stations(id).patch(station, where);
  }

  @del('/branches/{id}/stations', {
    responses: {
      '200': {
        description: 'Branch.Station DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Station)) where?: Where<Station>,
  ): Promise<Count> {
    return this.branchRepository.stations(id).delete(where);
  }
}
