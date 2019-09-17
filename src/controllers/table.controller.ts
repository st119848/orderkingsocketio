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
import {Table} from '../models';
import {TableRepository} from '../repositories';

export class TableController {
  constructor(
    @repository(TableRepository)
    public tableRepository : TableRepository,
  ) {}

  @post('/tables', {
    responses: {
      '200': {
        description: 'Table model instance',
        content: {'application/json': {schema: getModelSchemaRef(Table)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Table, {exclude: ['id']}),
        },
      },
    })
    table: Omit<Table, 'id'>,
  ): Promise<Table> {
    return this.tableRepository.create(table);
  }

  @get('/tables', {
    responses: {
      '200': {
        description: 'Array of Table model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Table)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Table)) filter?: Filter<Table>,
  ): Promise<Table[]> {
    return this.tableRepository.find(filter);
  }

  @get('/tables/{id}', {
    responses: {
      '200': {
        description: 'Table model instance',
        content: {'application/json': {schema: getModelSchemaRef(Table)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Table> {
    return this.tableRepository.findById(id);
  }

  @patch('/tables/{id}', {
    responses: {
      '204': {
        description: 'Table PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Table, {partial: true}),
        },
      },
    })
    table: Table,
  ): Promise<void> {
    await this.tableRepository.updateById(id, table);
  }

  @del('/tables/{id}', {
    responses: {
      '204': {
        description: 'Table DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tableRepository.deleteById(id);
  }
}
