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
  Table,
} from '../models';
import {BranchRepository} from '../repositories';

export class TableController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository,
  ) { }

  @get('/branches/{id}/tables', {
    responses: {
      '200': {
        description: 'Array of Table\'s belonging to Branch',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Table)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Table>,
  ): Promise<Table[]> {
    return this.branchRepository.tables(id).find(filter);
  }

  @post('/branches/{id}/tables', {
    responses: {
      '200': {
        description: 'Branch model instance',
        content: {'application/json': {schema: getModelSchemaRef(Table)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Branch.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Table, {
            exclude: ['id'],
            optional: ['branchId']
          }),
        },
      },
    }) table: Omit<Table, 'id'>,
  ): Promise<Table> {
    return this.branchRepository.tables(id).create(table);
  }

  @patch('/branches/{id}/tables', {
    responses: {
      '200': {
        description: 'Branch.Table PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Table, {partial: true}),
        },
      },
    })
    table: Partial<Table>,
    @param.query.object('where', getWhereSchemaFor(Table)) where?: Where<Table>,
  ): Promise<Count> {
    return this.branchRepository.tables(id).patch(table, where);
  }

  @del('/branches/{id}/tables', {
    responses: {
      '200': {
        description: 'Branch.Table DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Table)) where?: Where<Table>,
  ): Promise<Count> {
    return this.branchRepository.tables(id).delete(where);
  }
}
