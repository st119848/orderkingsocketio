import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
<<<<<<< HEAD
import {User, UserRelations, RestaurantReview, Order} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RestaurantReviewRepository} from './restaurant-review.repository';
import {OrderRepository} from './order.repository';
=======
import {User, UserRelations, RestaurantReview} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RestaurantReviewRepository} from './restaurant-review.repository';
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly restaurantReviews: HasManyRepositoryFactory<RestaurantReview, typeof User.prototype.id>;

<<<<<<< HEAD
  public readonly orders: HasManyRepositoryFactory<Order, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('RestaurantReviewRepository') protected restaurantReviewRepositoryGetter: Getter<RestaurantReviewRepository>, @repository.getter('OrderRepository') protected orderRepositoryGetter: Getter<OrderRepository>,
  ) {
    super(User, dataSource);
    this.orders = this.createHasManyRepositoryFactoryFor('orders', orderRepositoryGetter,);
=======
  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('RestaurantReviewRepository') protected restaurantReviewRepositoryGetter: Getter<RestaurantReviewRepository>,
  ) {
    super(User, dataSource);
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
    this.restaurantReviews = this.createHasManyRepositoryFactoryFor('restaurantReviews', restaurantReviewRepositoryGetter,);
  }
}
