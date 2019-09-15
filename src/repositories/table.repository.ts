import {DefaultCrudRepository} from '@loopback/repository';
import {Table, TableRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TableRepository extends DefaultCrudRepository<
  Table,
  typeof Table.prototype.id,
  TableRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Table, dataSource);
  }
}
