import {DefaultCrudRepository} from '@loopback/repository';
import {ProductMedia, ProductMediaRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductMediaRepository extends DefaultCrudRepository<
  ProductMedia,
  typeof ProductMedia.prototype.id,
  ProductMediaRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ProductMedia, dataSource);
  }
}
