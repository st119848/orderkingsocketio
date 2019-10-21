<<<<<<< HEAD
import { Entity, model, property } from "@loopback/repository";

@model({ settings: {} })
export class Table extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true
=======
import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Table extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  })
  id: number;

  @property({
<<<<<<< HEAD
    type: "string",
    required: true
=======
    type: 'string',
    required: true,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  })
  table_number: string;

  @property({
<<<<<<< HEAD
    type: "string",
    required: true
=======
    type: 'string',
    required: true,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  })
  description: string;

  @property({
<<<<<<< HEAD
    type: "number",
    required: true
  })
  capacity: number;
  @property({
    type: "string",
    required: true
  })
  status: string;
  @property({
    type: "number"
=======
    type: 'number',
    required: true,
  })
  capacity: number;

  @property({
    type: 'number',
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
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
