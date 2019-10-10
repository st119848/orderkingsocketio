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
import {Printer} from '../models';
import {PrinterRepository} from '../repositories';

export class PrinterController {
  constructor(
    @repository(PrinterRepository)
    public printerRepository : PrinterRepository,
  ) {}

  @post('/printers', {
    responses: {
      '200': {
        description: 'Printer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Printer)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Printer, {exclude: ['id']}),
        },
      },
    })
    printer: Omit<Printer, 'id'>,
  ): Promise<Printer> {
    return this.printerRepository.create(printer);
  }

  @get('/printers', {
    responses: {
      '200': {
        description: 'Array of Printer model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Printer)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Printer)) filter?: Filter<Printer>,
  ): Promise<Printer[]> {
    return this.printerRepository.find(filter);
  }

  @get('/printers/{id}', {
    responses: {
      '200': {
        description: 'Printer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Printer)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Printer> {
    return this.printerRepository.findById(id);
  }

  @patch('/printers/{id}', {
    responses: {
      '204': {
        description: 'Printer PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Printer, {partial: true}),
        },
      },
    })
    printer: Printer,
  ): Promise<void> {
    await this.printerRepository.updateById(id, printer);
  }

  @del('/printers/{id}', {
    responses: {
      '204': {
        description: 'Printer DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.printerRepository.deleteById(id);
  }
}
