import {DefaultCrudRepository} from '@loopback/repository';
import {Queue, QueueRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class QueueRepository extends DefaultCrudRepository<
  Queue,
  typeof Queue.prototype.id,
  QueueRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Queue, dataSource);
  }
}
