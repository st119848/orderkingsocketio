import {DefaultCrudRepository} from '@loopback/repository';
import {JoinTable, JoinTableRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class JoinTableRepository extends DefaultCrudRepository<
  JoinTable,
  typeof JoinTable.prototype.id,
  JoinTableRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(JoinTable, dataSource);
  }
}
