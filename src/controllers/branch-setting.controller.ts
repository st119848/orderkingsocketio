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
import {BranchSetting} from '../models';
import {BranchSettingRepository} from '../repositories';

export class BranchSettingController {
  constructor(
    @repository(BranchSettingRepository)
    public branchSettingRepository : BranchSettingRepository,
  ) {}

  @post('/branch-settings', {
    responses: {
      '200': {
        description: 'BranchSetting model instance',
        content: {'application/json': {schema: getModelSchemaRef(BranchSetting)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BranchSetting, {exclude: ['id']}),
        },
      },
    })
    branchSetting: Omit<BranchSetting, 'id'>,
  ): Promise<BranchSetting> {
    return this.branchSettingRepository.create(branchSetting);
  }

  @get('/branch-settings', {
    responses: {
      '200': {
        description: 'Array of BranchSetting model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BranchSetting)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(BranchSetting)) filter?: Filter<BranchSetting>,
  ): Promise<BranchSetting[]> {
    return this.branchSettingRepository.find(filter);
  }

  @get('/branch-settings/{id}', {
    responses: {
      '200': {
        description: 'BranchSetting model instance',
        content: {'application/json': {schema: getModelSchemaRef(BranchSetting)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<BranchSetting> {
    return this.branchSettingRepository.findById(id);
  }

  @patch('/branch-settings/{id}', {
    responses: {
      '204': {
        description: 'BranchSetting PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BranchSetting, {partial: true}),
        },
      },
    })
    branchSetting: BranchSetting,
  ): Promise<void> {
    await this.branchSettingRepository.updateById(id, branchSetting);
  }

  @del('/branch-settings/{id}', {
    responses: {
      '204': {
        description: 'BranchSetting DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.branchSettingRepository.deleteById(id);
  }
}
