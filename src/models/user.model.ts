import {Entity, model, property, hasMany} from '@loopback/repository';
import {Customer} from './customer.model';
import {Driver} from './driver.model';
import {Employee} from './employee.model';

@model({settings: {}})
export class User extends Entity {

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
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  phone_number: number;

  @property({
    type: 'number',
    required: true,
  })
  user_type: number;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  @hasMany(() => Customer)
  customers: Customer[];

  @hasMany(() => Driver)
  drivers: Driver[];

  @hasMany(() => Employee)
  employees: Employee[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
