<<<<<<< HEAD
import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Employee} from './employee.model';
import {Branch} from './branch.model';
=======
import {Entity, model, property, hasMany} from '@loopback/repository';
import {Employee} from './employee.model';
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254

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

<<<<<<< HEAD
  @belongsTo(() => Branch)
  branchId: number;
=======
  @property({
    type: 'number',
  })
  branchId?: number;
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254

  constructor(data?: Partial<Group>) {
    super(data);
  }
}

export interface GroupRelations {
  // describe navigational properties here
}

export type GroupWithRelations = Group & GroupRelations;
