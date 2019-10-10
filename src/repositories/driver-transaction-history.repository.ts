import {DefaultCrudRepository} from '@loopback/repository';
import {DriverTransactionHistory, DriverTransactionHistoryRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DriverTransactionHistoryRepository extends DefaultCrudRepository<
  DriverTransactionHistory,
  typeof DriverTransactionHistory.prototype.id,
  DriverTransactionHistoryRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(DriverTransactionHistory, dataSource);
  }
}
