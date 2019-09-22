import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Driver} from './driver.model';
import {DriverTransactionHistory} from './driver-transaction-history.model';

@model({settings: {}})
export class DriverWallet extends Entity {
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
  balance: number;

  @belongsTo(() => Driver)
  driverId: number;

  @hasMany(() => DriverTransactionHistory)
  driverTransactionHistories: DriverTransactionHistory[];

  constructor(data?: Partial<DriverWallet>) {
    super(data);
  }
}

export interface DriverWalletRelations {
  // describe navigational properties here
}

export type DriverWalletWithRelations = DriverWallet & DriverWalletRelations;
