import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, RestaurantReview} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RestaurantReviewRepository} from './restaurant-review.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly restaurantReviews: HasManyRepositoryFactory<RestaurantReview, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('RestaurantReviewRepository') protected restaurantReviewRepositoryGetter: Getter<RestaurantReviewRepository>,
  ) {
    super(User, dataSource);
    this.restaurantReviews = this.createHasManyRepositoryFactoryFor('restaurantReviews', restaurantReviewRepositoryGetter,);
  }
}
