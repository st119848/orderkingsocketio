import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Customer, CustomerRelations, CreditCard} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CreditCardRepository} from './credit-card.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {

  public readonly creditCards: HasManyRepositoryFactory<CreditCard, typeof Customer.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CreditCardRepository') protected creditCardRepositoryGetter: Getter<CreditCardRepository>,
  ) {
    super(Customer, dataSource);
    this.creditCards = this.createHasManyRepositoryFactoryFor('creditCards', creditCardRepositoryGetter,);
  }
}
