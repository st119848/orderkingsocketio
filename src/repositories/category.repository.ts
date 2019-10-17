import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Category, CategoryRelations, Branch} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BranchRepository} from './branch.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {

  public readonly branch: BelongsToAccessor<Branch, typeof Category.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BranchRepository') protected branchRepositoryGetter: Getter<BranchRepository>,
  ) {
    super(Category, dataSource);
    this.branch = this.createBelongsToAccessorFor('branch', branchRepositoryGetter,);
  }
}
