<<<<<<< HEAD
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Category, CategoryRelations, Branch} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BranchRepository} from './branch.repository';
=======
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Category, CategoryRelations, Product} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProductRepository} from './product.repository';
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {

<<<<<<< HEAD
  public readonly branch: BelongsToAccessor<Branch, typeof Category.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BranchRepository') protected branchRepositoryGetter: Getter<BranchRepository>,
  ) {
    super(Category, dataSource);
    this.branch = this.createBelongsToAccessorFor('branch', branchRepositoryGetter,);
=======
  public readonly products: HasManyRepositoryFactory<Product, typeof Category.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Category, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  }
}
