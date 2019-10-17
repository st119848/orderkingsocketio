import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Station,
  Branch,
} from '../models';
import {StationRepository} from '../repositories';

export class StationBranchController {
  constructor(
    @repository(StationRepository)
    public stationRepository: StationRepository,
  ) { }

  @get('/stations/{id}/branch', {
    responses: {
      '200': {
        description: 'Branch belonging to Station',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Branch)},
          },
        },
      },
    },
  })
  async getBranch(
    @param.path.number('id') id: typeof Station.prototype.id,
  ): Promise<Branch> {
    return this.stationRepository.branch(id);
  }
}
