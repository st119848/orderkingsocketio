import {DefaultCrudRepository} from '@loopback/repository';
import {ProductOptionChoice, ProductOptionChoiceRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductOptionChoiceRepository extends DefaultCrudRepository<
  ProductOptionChoice,
  typeof ProductOptionChoice.prototype.id,
  ProductOptionChoiceRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ProductOptionChoice, dataSource);
  }
}
