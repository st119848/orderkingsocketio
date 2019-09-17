import {DefaultCrudRepository} from '@loopback/repository';
import {PrintLayout, PrintLayoutRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PrintLayoutRepository extends DefaultCrudRepository<
  PrintLayout,
  typeof PrintLayout.prototype.id,
  PrintLayoutRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(PrintLayout, dataSource);
  }
}
