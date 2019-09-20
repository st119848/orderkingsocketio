import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  BranchSetting,
  Branch,
} from '../models';
import {BranchSettingRepository} from '../repositories';

export class BranchSettingBranchController {
  constructor(
    @repository(BranchSettingRepository)
    public branchSettingRepository: BranchSettingRepository,
  ) { }

  @get('/branch-settings/{id}/branch', {
    responses: {
      '200': {
        description: 'Branch belonging to BranchSetting',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Branch)},
          },
        },
      },
    },
  })
  async getBranch(
    @param.path.number('id') id: typeof BranchSetting.prototype.id,
  ): Promise<Branch> {
    return this.branchSettingRepository.branch(id);
  }
}
