import {belongsTo, model, property, Entity} from '@loopback/repository';
import {User} from '.';
import { UserWithRelations } from './user.model';

@model({settings: {}})

export class Customer extends Entity {
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
    type: 'number',
  })
  userId?: number;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
}

export type CustomerWithRelations = Customer & CustomerRelations;
