import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Driver, DriverRelations, BankAccount} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BankAccountRepository} from './bank-account.repository';

export class DriverRepository extends DefaultCrudRepository<
  Driver,
  typeof Driver.prototype.id,
  DriverRelations
> {

  public readonly bankAccounts: HasManyRepositoryFactory<BankAccount, typeof Driver.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BankAccountRepository') protected bankAccountRepositoryGetter: Getter<BankAccountRepository>,
  ) {
    super(Driver, dataSource);
    this.bankAccounts = this.createHasManyRepositoryFactoryFor('bankAccounts', bankAccountRepositoryGetter,);
  }
}
