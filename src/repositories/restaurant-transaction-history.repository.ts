import {DefaultCrudRepository} from '@loopback/repository';
import {RestaurantTransactionHistory, RestaurantTransactionHistoryRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RestaurantTransactionHistoryRepository extends DefaultCrudRepository<
  RestaurantTransactionHistory,
  typeof RestaurantTransactionHistory.prototype.id,
  RestaurantTransactionHistoryRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(RestaurantTransactionHistory, dataSource);
  }
}
