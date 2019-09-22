import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Restaurant} from './restaurant.model';
import {RestaurantTransactionHistory} from './restaurant-transaction-history.model';

@model({settings: {}})
export class RestaurantWallet extends Entity {
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
  balance: number;

  @belongsTo(() => Restaurant)
  restaurantId: number;

  @hasMany(() => RestaurantTransactionHistory)
  restaurantTransactionHistories: RestaurantTransactionHistory[];

  constructor(data?: Partial<RestaurantWallet>) {
    super(data);
  }
}

export interface RestaurantWalletRelations {
  // describe navigational properties here
}

export type RestaurantWalletWithRelations = RestaurantWallet & RestaurantWalletRelations;
