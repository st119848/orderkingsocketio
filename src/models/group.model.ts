import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Employee} from './employee.model';
import {Branch} from './branch.model';

@model({settings: {}})
export class Group extends Entity {
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
  role: string;

  @property({
    type: 'number',
    required: true,
  })
  access_area: number;

  @hasMany(() => Employee)
  employees: Employee[];

  @belongsTo(() => Branch)
  branchId: number;

  constructor(data?: Partial<Group>) {
    super(data);
  }
}

export interface GroupRelations {
  // describe navigational properties here
}

export type GroupWithRelations = Group & GroupRelations;
