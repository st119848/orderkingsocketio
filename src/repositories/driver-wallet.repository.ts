import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DriverWallet, DriverWalletRelations, Driver, DriverTransactionHistory} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DriverRepository} from './driver.repository';
import {DriverTransactionHistoryRepository} from './driver-transaction-history.repository';

export class DriverWalletRepository extends DefaultCrudRepository<
  DriverWallet,
  typeof DriverWallet.prototype.id,
  DriverWalletRelations
> {

  public readonly driver: BelongsToAccessor<Driver, typeof DriverWallet.prototype.id>;

  public readonly driverTransactionHistories: HasManyRepositoryFactory<DriverTransactionHistory, typeof DriverWallet.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DriverRepository') protected driverRepositoryGetter: Getter<DriverRepository>, @repository.getter('DriverTransactionHistoryRepository') protected driverTransactionHistoryRepositoryGetter: Getter<DriverTransactionHistoryRepository>,
  ) {
    super(DriverWallet, dataSource);
    this.driverTransactionHistories = this.createHasManyRepositoryFactoryFor('driverTransactionHistories', driverTransactionHistoryRepositoryGetter,);
    this.driver = this.createBelongsToAccessorFor('driver', driverRepositoryGetter,);
  }
}
