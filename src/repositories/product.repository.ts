import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Product, ProductRelations, ProductOption} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProductOptionRepository} from './product-option.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly productOptions: HasManyRepositoryFactory<ProductOption, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProductOptionRepository') protected productOptionRepositoryGetter: Getter<ProductOptionRepository>,
  ) {
    super(Product, dataSource);
    this.productOptions = this.createHasManyRepositoryFactoryFor('productOptions', productOptionRepositoryGetter,);
  }
}
