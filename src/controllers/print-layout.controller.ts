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
import {PrintLayout} from '../models';
import {PrintLayoutRepository} from '../repositories';

export class PrintLayoutController {
  constructor(
    @repository(PrintLayoutRepository)
    public printLayoutRepository : PrintLayoutRepository,
  ) {}

  @post('/print-layouts', {
    responses: {
      '200': {
        description: 'PrintLayout model instance',
        content: {'application/json': {schema: getModelSchemaRef(PrintLayout)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrintLayout, {exclude: ['id']}),
        },
      },
    })
    printLayout: Omit<PrintLayout, 'id'>,
  ): Promise<PrintLayout> {
    return this.printLayoutRepository.create(printLayout);
  }

  @get('/print-layouts', {
    responses: {
      '200': {
        description: 'Array of PrintLayout model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PrintLayout)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(PrintLayout)) filter?: Filter<PrintLayout>,
  ): Promise<PrintLayout[]> {
    return this.printLayoutRepository.find(filter);
  }

  @get('/print-layouts/{id}', {
    responses: {
      '200': {
        description: 'PrintLayout model instance',
        content: {'application/json': {schema: getModelSchemaRef(PrintLayout)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<PrintLayout> {
    return this.printLayoutRepository.findById(id);
  }

  @patch('/print-layouts/{id}', {
    responses: {
      '204': {
        description: 'PrintLayout PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrintLayout, {partial: true}),
        },
      },
    })
    printLayout: PrintLayout,
  ): Promise<void> {
    await this.printLayoutRepository.updateById(id, printLayout);
  }

  @del('/print-layouts/{id}', {
    responses: {
      '204': {
        description: 'PrintLayout DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.printLayoutRepository.deleteById(id);
  }
}
