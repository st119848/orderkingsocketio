import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {RestaurantWallet, RestaurantWalletRelations, Restaurant, RestaurantTransactionHistory} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RestaurantRepository} from './restaurant.repository';
import {RestaurantTransactionHistoryRepository} from './restaurant-transaction-history.repository';

export class RestaurantWalletRepository extends DefaultCrudRepository<
  RestaurantWallet,
  typeof RestaurantWallet.prototype.id,
  RestaurantWalletRelations
> {

  public readonly restaurant: BelongsToAccessor<Restaurant, typeof RestaurantWallet.prototype.id>;

  public readonly restaurantTransactionHistories: HasManyRepositoryFactory<RestaurantTransactionHistory, typeof RestaurantWallet.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('RestaurantRepository') protected restaurantRepositoryGetter: Getter<RestaurantRepository>, @repository.getter('RestaurantTransactionHistoryRepository') protected restaurantTransactionHistoryRepositoryGetter: Getter<RestaurantTransactionHistoryRepository>,
  ) {
    super(RestaurantWallet, dataSource);
    this.restaurantTransactionHistories = this.createHasManyRepositoryFactoryFor('restaurantTransactionHistories', restaurantTransactionHistoryRepositoryGetter,);
    this.restaurant = this.createBelongsToAccessorFor('restaurant', restaurantRepositoryGetter,);
  }
}
