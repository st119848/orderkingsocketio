import {DefaultCrudRepository} from '@loopback/repository';
import {RestaurantReview, RestaurantReviewRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RestaurantReviewRepository extends DefaultCrudRepository<
  RestaurantReview,
  typeof RestaurantReview.prototype.id,
  RestaurantReviewRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(RestaurantReview, dataSource);
  }
}
