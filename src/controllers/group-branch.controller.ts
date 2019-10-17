import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Group,
  Branch,
} from '../models';
import {GroupRepository} from '../repositories';

export class GroupBranchController {
  constructor(
    @repository(GroupRepository)
    public groupRepository: GroupRepository,
  ) { }

  @get('/groups/{id}/branch', {
    responses: {
      '200': {
        description: 'Branch belonging to Group',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Branch)},
          },
        },
      },
    },
  })
  async getBranch(
    @param.path.number('id') id: typeof Group.prototype.id,
  ): Promise<Branch> {
    return this.groupRepository.branch(id);
  }
}
