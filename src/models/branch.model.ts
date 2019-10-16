import {Entity, model, property, hasMany} from '@loopback/repository';
import {Station} from './station.model';
import {Table} from './table.model';
import {Printer} from './printer.model';
import {PrintLayout} from './print-layout.model';
import {Group} from './group.model';
import {BankAccount} from './bank-account.model';
import {CreditCard} from './credit-card.model';
import {Order} from './order.model';

@model({settings: {}})
export class Branch extends Entity {
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
  branch_name: string;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  store_type: number;

  @property({
    type: 'string',
    required: true,
  })
  phone_number: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @property({
    type: 'string',
  })
  about_us?: string;

  @property({
    type: 'object',
    default: [],
  })
  covered_photos?: object;

  @property({
    type: 'string',
    required: true,
  })
  opening_hour: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  opening_days: string[];

  @property({
    type: 'number',
  })
  restaurantId?: number;

  @hasMany(() => Station)
  stations: Station[];

  @hasMany(() => Table)
  tables: Table[];

  @hasMany(() => Printer)
  printers: Printer[];

  @hasMany(() => PrintLayout)
  printLayouts: PrintLayout[];

  @hasMany(() => Group)
  groups: Group[];

  @hasMany(() => BankAccount)
  bankAccounts: BankAccount[];

  @hasMany(() => CreditCard)
  creditCards: CreditCard[];

  @hasMany(() => Order)
  branchId: Order[];

  @hasMany(() => Order)
  orders: Order[];

  constructor(data?: Partial<Branch>) {
    super(data);
  }
}

export interface BranchRelations {
  // describe navigational properties here
}

export type BranchWithRelations = Branch & BranchRelations;
