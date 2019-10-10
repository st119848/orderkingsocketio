import {DefaultCrudRepository} from '@loopback/repository';
import {DriverReview, DriverReviewRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DriverReviewRepository extends DefaultCrudRepository<
  DriverReview,
  typeof DriverReview.prototype.id,
  DriverReviewRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(DriverReview, dataSource);
  }
}
