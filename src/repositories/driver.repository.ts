import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Driver, DriverRelations, User, BankAccount, DriverReview} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {BankAccountRepository} from './bank-account.repository';
import {DriverReviewRepository} from './driver-review.repository';

export class DriverRepository extends DefaultCrudRepository<
  Driver,
  typeof Driver.prototype.id,
  DriverRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Driver.prototype.id>;

  public readonly bankAccounts: HasManyRepositoryFactory<BankAccount, typeof Driver.prototype.id>;

  public readonly driverReviews: HasManyRepositoryFactory<DriverReview, typeof Driver.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('BankAccountRepository') protected bankAccountRepositoryGetter: Getter<BankAccountRepository>, @repository.getter('DriverReviewRepository') protected driverReviewRepositoryGetter: Getter<DriverReviewRepository>,
  ) {
    super(Driver, dataSource);
    this.driverReviews = this.createHasManyRepositoryFactoryFor('driverReviews', driverReviewRepositoryGetter,);
    this.bankAccounts = this.createHasManyRepositoryFactoryFor('bankAccounts', bankAccountRepositoryGetter,);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
  }
}
