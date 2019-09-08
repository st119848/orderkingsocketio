import {Driver, DriverRelations, User} from '../models';
import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, BelongsToAccessor, repository, juggler} from '@loopback/repository';
import { UserRepository } from './user.repository';

export class DriverRepository extends DefaultCrudRepository<
  Driver,
  typeof Driver.prototype.id,
  DriverRelations
> {
  public readonly user: BelongsToAccessor<
    User,
    typeof Driver.prototype.id
  >;

  constructor(
    @inject('datasources.db') public dataSource: juggler.DataSource,
    @repository.getter('UserRepository')
    userRepositoryGetter: Getter<UserRepository>
  ) {
    super(Driver, dataSource);
    this.user = this.createBelongsToAccessorFor(
      'user',
      userRepositoryGetter,
    );
  }
}
