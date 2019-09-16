import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Table extends Entity {
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
  table_number: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  capacity: number;

  @property({
    type: 'number',
  })
  branchId?: number;

  constructor(data?: Partial<Table>) {
    super(data);
  }
}

export interface TableRelations {
  // describe navigational properties here
}

export type TableWithRelations = Table & TableRelations;
