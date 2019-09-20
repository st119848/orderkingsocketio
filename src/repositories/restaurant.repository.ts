import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Restaurant, RestaurantRelations, Branch, RestaurantReward, RestaurantReview} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BranchRepository} from './branch.repository';
import {RestaurantRewardRepository} from './restaurant-reward.repository';
import {RestaurantReviewRepository} from './restaurant-review.repository';

export class RestaurantRepository extends DefaultCrudRepository<
  Restaurant,
  typeof Restaurant.prototype.id,
  RestaurantRelations
> {

  public readonly branches: HasManyRepositoryFactory<Branch, typeof Restaurant.prototype.id>;

  public readonly restaurantRewards: HasManyRepositoryFactory<RestaurantReward, typeof Restaurant.prototype.id>;

  public readonly restaurantReviews: HasManyRepositoryFactory<RestaurantReview, typeof Restaurant.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BranchRepository') protected branchRepositoryGetter: Getter<BranchRepository>, @repository.getter('RestaurantRewardRepository') protected restaurantRewardRepositoryGetter: Getter<RestaurantRewardRepository>, @repository.getter('RestaurantReviewRepository') protected restaurantReviewRepositoryGetter: Getter<RestaurantReviewRepository>,
  ) {
    super(Restaurant, dataSource);
    this.restaurantReviews = this.createHasManyRepositoryFactoryFor('restaurantReviews', restaurantReviewRepositoryGetter,);
    this.restaurantRewards = this.createHasManyRepositoryFactoryFor('restaurantRewards', restaurantRewardRepositoryGetter,);
    this.branches = this.createHasManyRepositoryFactoryFor('branches', branchRepositoryGetter,);
  }
}
