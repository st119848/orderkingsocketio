import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class DriverTransactionHistory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  transaction_type: number;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  @property({
    type: 'string',
    required: true,
  })
  from: string;

  @property({
    type: 'string',
    required: true,
  })
  recipient_name: string;

  @property({
    type: 'string',
    required: true,
  })
  recipient_account_no: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'number',
    required: true,
  })
  fee: number;

  @property({
    type: 'string',
    required: true,
  })
  reference_no: string;

  @property({
    type: 'string',
    required: true,
  })
  note: string;

  @property({
    type: 'string',
    required: true,
  })
  slip: string;

  @property({
    type: 'number',
    required: true,
  })
  status: number;

  @property({
    type: 'number',
  })
  driverWalletId?: number;

  constructor(data?: Partial<DriverTransactionHistory>) {
    super(data);
  }
}

export interface DriverTransactionHistoryRelations {
  // describe navigational properties here
}

export type DriverTransactionHistoryWithRelations = DriverTransactionHistory & DriverTransactionHistoryRelations;
