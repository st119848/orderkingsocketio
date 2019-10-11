import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class JoinTable extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  tableId: number;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'date',
    default: "now",
  })
  createTime?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  owner: boolean;

  @property({
    type: 'string',
  })
  status?: string;


  constructor(data?: Partial<JoinTable>) {
    super(data);
  }
}

export interface JoinTableRelations {
  // describe navigational properties here
}

export type JoinTableWithRelations = JoinTable & JoinTableRelations;
