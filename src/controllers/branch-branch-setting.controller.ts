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
  BranchSetting,
} from '../models';
import {BranchRepository} from '../repositories';

export class BranchBranchSettingController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository,
  ) { }

  @get('/branches/{id}/branch-settings', {
    responses: {
      '200': {
        description: 'Array of BranchSetting\'s belonging to Branch',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BranchSetting)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BranchSetting>,
  ): Promise<BranchSetting[]> {
    return this.branchRepository.branchSettings(id).find(filter);
  }

  @post('/branches/{id}/branch-settings', {
    responses: {
      '200': {
        description: 'Branch model instance',
        content: {'application/json': {schema: getModelSchemaRef(BranchSetting)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Branch.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BranchSetting, {
            title: 'NewBranchSettingInBranch',
            exclude: ['id'],
            optional: ['branchId']
          }),
        },
      },
    }) branchSetting: Omit<BranchSetting, 'id'>,
  ): Promise<BranchSetting> {
    return this.branchRepository.branchSettings(id).create(branchSetting);
  }

  @patch('/branches/{id}/branch-settings', {
    responses: {
      '200': {
        description: 'Branch.BranchSetting PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BranchSetting, {partial: true}),
        },
      },
    })
    branchSetting: Partial<BranchSetting>,
    @param.query.object('where', getWhereSchemaFor(BranchSetting)) where?: Where<BranchSetting>,
  ): Promise<Count> {
    return this.branchRepository.branchSettings(id).patch(branchSetting, where);
  }

  @del('/branches/{id}/branch-settings', {
    responses: {
      '200': {
        description: 'Branch.BranchSetting DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BranchSetting)) where?: Where<BranchSetting>,
  ): Promise<Count> {
    return this.branchRepository.branchSettings(id).delete(where);
  }
}
