import {belongsTo, model, property, Entity, hasMany} from '@loopback/repository';
import {User} from '.';
import {CreditCard} from './credit-card.model';

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

  @belongsTo(() => User)
  userId: number;

  @hasMany(() => CreditCard)
  creditCards: CreditCard[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
}

export type CustomerWithRelations = Customer & CustomerRelations;
