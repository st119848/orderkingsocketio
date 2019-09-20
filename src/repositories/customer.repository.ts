import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Customer, CustomerRelations, User, CreditCard} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {CreditCardRepository} from './credit-card.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Customer.prototype.id>;

  public readonly creditCards: HasManyRepositoryFactory<CreditCard, typeof Customer.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('CreditCardRepository') protected creditCardRepositoryGetter: Getter<CreditCardRepository>,
  ) {
    super(Customer, dataSource);
    this.creditCards = this.createHasManyRepositoryFactoryFor('creditCards', creditCardRepositoryGetter,);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
  }
}
