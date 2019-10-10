import {DefaultCrudRepository} from '@loopback/repository';
import {BankAccount, BankAccountRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BankAccountRepository extends DefaultCrudRepository<
  BankAccount,
  typeof BankAccount.prototype.id,
  BankAccountRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(BankAccount, dataSource);
  }
}
