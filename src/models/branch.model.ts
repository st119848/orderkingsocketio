<<<<<<< HEAD
import { Entity, model, property, hasMany } from "@loopback/repository";
import { Station } from "./station.model";
import { Table } from "./table.model";
import { Printer } from "./printer.model";
import { PrintLayout } from "./print-layout.model";
import { Group } from "./group.model";
import { BankAccount } from "./bank-account.model";
import { CreditCard } from "./credit-card.model";
import { Order } from "./order.model";
import { Category } from "./category.model";
import { Reservation } from "./reservation.model";
import { Product } from "./product.model";
import {Bills} from './bills.model';
import {BranchSetting} from './branch-setting.model';

@model({ settings: {} })
export class Branch extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true
=======
import {Entity, model, property, hasMany} from '@loopback/repository';
import {Station} from './station.model';
import {Table} from './table.model';
import {Printer} from './printer.model';
import {PrintLayout} from './print-layout.model';
import {Group} from './group.model';
import {BankAccount} from './bank-account.model';
import {CreditCard} from './credit-card.model';

@model({settings: {}})
export class Branch extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  })
  id: number;

  @property({
<<<<<<< HEAD
    type: "string",
    required: true
=======
    type: 'string',
    required: true,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  })
  branch_name: string;

  @property({
<<<<<<< HEAD
    type: "number",
    required: true,
    default: 0
=======
    type: 'number',
    required: true,
    default: 0,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  })
  store_type: number;

  @property({
<<<<<<< HEAD
    type: "string",
    required: true
=======
    type: 'string',
    required: true,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  })
  phone_number: string;

  @property({
<<<<<<< HEAD
    type: "string",
    required: true
=======
    type: 'string',
    required: true,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  })
  address: string;

  @property({
<<<<<<< HEAD
    type: "string",
    required: true
=======
    type: 'string',
    required: true,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  })
  location: string;

  @property({
<<<<<<< HEAD
    type: "string"
=======
    type: 'string',
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  })
  about_us?: string;

  @property({
<<<<<<< HEAD
    type: "object",
    default: []
=======
    type: 'object',
    default: [],
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  })
  covered_photos?: object;

  @property({
<<<<<<< HEAD
    type: "string",
    required: true
=======
    type: 'string',
    required: true,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  })
  opening_hour: string;

  @property({
<<<<<<< HEAD
    type: "array",
    itemType: "string",
    required: true
=======
    type: 'array',
    itemType: 'string',
    required: true,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  })
  opening_days: string[];

  @property({
<<<<<<< HEAD
    type: "number"
=======
    type: 'number',
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
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

<<<<<<< HEAD
  @hasMany(() => Order)
  branchId: Order[];

  @hasMany(() => Order)
  orders: Order[];

  @hasMany(() => Category)
  categories: Category[];

  @hasMany(() => Reservation)
  reservations: Reservation[];

  @hasMany(() => Product, { keyTo: "branchId" })
  products: Product[];

  @hasMany(() => Bills)
  bills: Bills[];

  @hasMany(() => BranchSetting)
  branchSettings: BranchSetting[];

=======
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  constructor(data?: Partial<Branch>) {
    super(data);
  }
}

export interface BranchRelations {
  // describe navigational properties here
}

export type BranchWithRelations = Branch & BranchRelations;
