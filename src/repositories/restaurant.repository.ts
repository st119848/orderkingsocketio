import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Restaurant, RestaurantRelations, Branch} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BranchRepository} from './branch.repository';

export class RestaurantRepository extends DefaultCrudRepository<
  Restaurant,
  typeof Restaurant.prototype.id,
  RestaurantRelations
> {

  public readonly branches: HasManyRepositoryFactory<Branch, typeof Restaurant.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BranchRepository') protected branchRepositoryGetter: Getter<BranchRepository>,
  ) {
    super(Restaurant, dataSource);
    this.branches = this.createHasManyRepositoryFactoryFor('branches', branchRepositoryGetter,);
  }
}
