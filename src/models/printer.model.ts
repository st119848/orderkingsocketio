import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Printer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  model: string;

  @property({
    type: 'string',
    required: true,
  })
  ip_address: string;

  @property({
    type: 'string',
    required: true,
  })
  ticket_width: string;

  @property({
    type: 'string',
    required: true,
  })
  connection_type: string;

  @property({
    type: 'number',
  })
  branchId?: number;

  constructor(data?: Partial<Printer>) {
    super(data);
  }
}

export interface PrinterRelations {
  // describe navigational properties here
}

export type PrinterWithRelations = Printer & PrinterRelations;
