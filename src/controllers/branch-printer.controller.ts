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
  Printer,
} from '../models';
import {BranchRepository} from '../repositories';

export class BranchPrinterController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository,
  ) { }

  @get('/branches/{id}/printers', {
    responses: {
      '200': {
        description: 'Array of Printer\'s belonging to Branch',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Printer)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Printer>,
  ): Promise<Printer[]> {
    return this.branchRepository.printers(id).find(filter);
  }

  @patch('/branches/{id}/printers', {
    responses: {
      '200': {
        description: 'Branch.Printer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Printer, {partial: true}),
        },
      },
    })
    printer: Partial<Printer>,
    @param.query.object('where', getWhereSchemaFor(Printer)) where?: Where<Printer>,
  ): Promise<Count> {
    return this.branchRepository.printers(id).patch(printer, where);
  }

  @del('/branches/{id}/printers', {
    responses: {
      '200': {
        description: 'Branch.Printer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Printer)) where?: Where<Printer>,
  ): Promise<Count> {
    return this.branchRepository.printers(id).delete(where);
  }
}
