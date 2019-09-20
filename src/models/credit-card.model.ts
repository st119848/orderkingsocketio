import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class CreditCard extends Entity {
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
  card_name: string;

  @property({
    type: 'string',
    required: true,
  })
  card_number: string;

  @property({
    type: 'date',
    required: true,
  })
  expire_date: string;

  @property({
    type: 'string',
    required: true,
  })
  cvv: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @property({
    type: 'number',
  })
  branchId?: number;

  constructor(data?: Partial<CreditCard>) {
    super(data);
  }
}

export interface CreditCardRelations {
  // describe navigational properties here
}

export type CreditCardWithRelations = CreditCard & CreditCardRelations;
