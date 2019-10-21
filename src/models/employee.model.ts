import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
<<<<<<< HEAD
import {Branch} from './branch.model';
=======
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254

@model({settings: {}})
export class Employee extends Entity {
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
  photo: string;

  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;
<<<<<<< HEAD
  @belongsTo(() => User)
  userId: number;

  @belongsTo(() => Branch)
  groupId: number;

=======
  @property({
    type: 'number',
  })
  groupId?: number;

  @belongsTo(() => User)
  userId: number;

>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
