import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Bills extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  branchId: number;

  @property({
    type: 'number',
    required: true,
  })
  guestId: number;

  @property({
    type: 'number',
  })
  promotionId?: number;

  @property({
    type: 'number',
  })
  qId?: number;

  @property({
    type: 'string',
    required: true,
  })
  invoice_id: string;

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  orderId: number[];

  @property({
    type: 'number',
    required: true,
  })
  cashierId: number;

  @property({
    type: 'number',
  })
  tableId?: number;

  @property({
    type: 'number',
    required: true,
  })
  transactionId: number;

  @property({
    type: 'string',
    required: true,
  })
  paymentMethod: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'string',
    required: true,
  })
  signature: string;

  @property({
    type: 'number',
    required: true,
  })
  guestNumber: number;

  @property({
    type: 'number',
    required: true,
  })
  tax: number;

  @property({
    type: 'number',
    required: true,
  })
  cash: number;

  @property({
    type: 'date',
    default: "now",
  })
  create_time?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  remark?: string;

  @property({
    type: 'number',
  })
  change?: number;

  @property({
    type: 'number',
  })
  serviceCharge?: number;

  @property({
    type: 'string',
  })
  QRcodeCreditCard?: string;

  @property({
    type: 'number',
    required: true,
  })
  subTotal: number;

  @property({
    type: 'date',
    required: true,
  })
  joinTime: string;

  @property({
    type: 'date',
  })
  reservationTime?: string;

  @property({
    type: 'date',
    default: "now",
  })
  modifyTime?: string;

  @property({
    type: 'number',
  })
  discount?: number;


  constructor(data?: Partial<Bills>) {
    super(data);
  }
}

export interface BillsRelations {
  // describe navigational properties here
}

export type BillsWithRelations = Bills & BillsRelations;
