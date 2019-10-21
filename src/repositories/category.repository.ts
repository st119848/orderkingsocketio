<<<<<<< HEAD
<<<<<<< HEAD
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor, HasManyRepositoryFactory} from "@loopback/repository";
import { Category, CategoryRelations, Branch, Product } from "../models";
import { DbDataSource } from "../datasources";
import { inject, Getter } from "@loopback/core";
import { BranchRepository } from "./branch.repository";
import { HasMany } from "loopback-datasource-juggler";
import { ProductRepository } from "./product.repository";
=======
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Category, CategoryRelations, Product} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProductRepository} from './product.repository';
>>>>>>> add category
=======
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor, HasManyRepositoryFactory} from "@loopback/repository";
import { Category, CategoryRelations, Branch, Product } from "../models";
import { DbDataSource } from "../datasources";
import { inject, Getter } from "@loopback/core";
import { BranchRepository } from "./branch.repository";
<<<<<<< HEAD
>>>>>>> update
=======
import { HasMany } from "loopback-datasource-juggler";
import { ProductRepository } from "./product.repository";
>>>>>>> update

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> update
  public readonly branch: BelongsToAccessor<
    Branch,
    typeof Category.prototype.id
  >;
<<<<<<< HEAD
=======
>>>>>>> add category

  public readonly products: HasManyRepositoryFactory<Product, typeof Category.prototype.id>;

  constructor(
<<<<<<< HEAD
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("BranchRepository")
    protected branchRepositoryGetter: Getter<BranchRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Category, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.branch = this.createBelongsToAccessorFor(
      "branch",
      branchRepositoryGetter
    );
=======
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Category, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
>>>>>>> add category
=======

  public readonly products: HasManyRepositoryFactory<Product, typeof Category.prototype.id>;

  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("BranchRepository")
    protected branchRepositoryGetter: Getter<BranchRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Category, dataSource);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.branch = this.createBelongsToAccessorFor(
      "branch",
      branchRepositoryGetter
    );
>>>>>>> update
  }
}
