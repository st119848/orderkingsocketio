import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class BankAccount extends Entity {
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
  bank_name: string;

  @property({
    type: 'string',
    required: true,
  })
  branch: string;

  @property({
    type: 'string',
    required: true,
  })
  account_number: string;

  @property({
    type: 'string',
    required: true,
  })
  account_name: string;

  @property({
    type: 'number',
  })
  branchId?: number;

  @property({
    type: 'number',
  })
  driverId?: number;

  constructor(data?: Partial<BankAccount>) {
    super(data);
  }
}

export interface BankAccountRelations {
  // describe navigational properties here
}

export type BankAccountWithRelations = BankAccount & BankAccountRelations;
