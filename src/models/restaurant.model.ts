import {Entity, model, property, hasMany} from '@loopback/repository';
import {Branch} from './branch.model';
import {RestaurantReward} from './restaurant-reward.model';
import {RestaurantReview} from './restaurant-review.model';

@model({settings: {}})
export class Restaurant extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
    required: true,
  })
  phone_number: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => Branch)
  branches: Branch[];

  @hasMany(() => RestaurantReward)
  restaurantRewards: RestaurantReward[];

  @hasMany(() => RestaurantReview)
  restaurantReviews: RestaurantReview[];

  constructor(data?: Partial<Restaurant>) {
    super(data);
  }
}

export interface RestaurantRelations {
  // describe navigational properties here
}

export type RestaurantWithRelations = Restaurant & RestaurantRelations;
