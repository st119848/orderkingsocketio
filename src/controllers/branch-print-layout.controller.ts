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
  requestBody,
} from '@loopback/rest';
import {
  PrintLayout,
} from '../models';
import {BranchRepository} from '../repositories';

export class BranchPrintLayoutController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository,
  ) { }

  @get('/branches/{id}/print-layouts', {
    responses: {
      '200': {
        description: 'Array of PrintLayout\'s belonging to Branch',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PrintLayout)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PrintLayout>,
  ): Promise<PrintLayout[]> {
    return this.branchRepository.printLayouts(id).find(filter);
  }

  @patch('/branches/{id}/print-layouts', {
    responses: {
      '200': {
        description: 'Branch.PrintLayout PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrintLayout, {partial: true}),
        },
      },
    })
    printLayout: Partial<PrintLayout>,
    @param.query.object('where', getWhereSchemaFor(PrintLayout)) where?: Where<PrintLayout>,
  ): Promise<Count> {
    return this.branchRepository.printLayouts(id).patch(printLayout, where);
  }

  @del('/branches/{id}/print-layouts', {
    responses: {
      '200': {
        description: 'Branch.PrintLayout DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PrintLayout)) where?: Where<PrintLayout>,
  ): Promise<Count> {
    return this.branchRepository.printLayouts(id).delete(where);
  }
}
