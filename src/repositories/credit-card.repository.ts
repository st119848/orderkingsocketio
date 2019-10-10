import {DefaultCrudRepository} from '@loopback/repository';
import {CreditCard, CreditCardRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CreditCardRepository extends DefaultCrudRepository<
  CreditCard,
  typeof CreditCard.prototype.id,
  CreditCardRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(CreditCard, dataSource);
  }
}
