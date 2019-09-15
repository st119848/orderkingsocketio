import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ProductOption, ProductOptionRelations, ProductOptionChoice} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProductOptionChoiceRepository} from './product-option-choice.repository';

export class ProductOptionRepository extends DefaultCrudRepository<
  ProductOption,
  typeof ProductOption.prototype.id,
  ProductOptionRelations
> {

  public readonly productOptionChoices: HasManyRepositoryFactory<ProductOptionChoice, typeof ProductOption.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProductOptionChoiceRepository') protected productOptionChoiceRepositoryGetter: Getter<ProductOptionChoiceRepository>,
  ) {
    super(ProductOption, dataSource);
    this.productOptionChoices = this.createHasManyRepositoryFactoryFor('productOptionChoices', productOptionChoiceRepositoryGetter,);
  }
}
