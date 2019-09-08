import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, BelongsToAccessor, repository, juggler} from '@loopback/repository';
import {Customer, CustomerRelations, User} from '../models';
import { UserRepository } from './user.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {
  public readonly user: BelongsToAccessor<
    User,
    typeof Customer.prototype.id
  >;

  constructor(
    @inject('datasources.db') public dataSource: juggler.DataSource,
    @repository.getter('UserRepository')
    userRepositoryGetter: Getter<UserRepository>
  ) {
    super(Customer, dataSource);
    this.user = this.createBelongsToAccessorFor(
      'user',
      userRepositoryGetter,
    );
  }
}
