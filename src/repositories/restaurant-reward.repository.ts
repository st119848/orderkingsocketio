import {DefaultCrudRepository} from '@loopback/repository';
import {RestaurantReward, RestaurantRewardRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class RestaurantRewardRepository extends DefaultCrudRepository<
  RestaurantReward,
  typeof RestaurantReward.prototype.id,
  RestaurantRewardRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(RestaurantReward, dataSource);
  }
}
