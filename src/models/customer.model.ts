import {belongsTo, model, property, Entity} from '@loopback/repository';
import {User} from '.';
import { UserWithRelations } from './user.model';

@model({settings: {}})

export class Customer extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<Customer>) {
    super(data);
  }

  @belongsTo(() => User,{keyTo:'pk'})
  userId: number
}

export interface CustomerRelations {
  user?: UserWithRelations
}

export type CustomerWithRelations = Customer & CustomerRelations;
