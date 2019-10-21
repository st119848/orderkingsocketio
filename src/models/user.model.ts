import {Entity, model, property, hasMany} from '@loopback/repository';
import {RestaurantReview} from './restaurant-review.model';
<<<<<<< HEAD
import {Order} from './order.model';
=======
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254

@model({settings: {}})
export class User extends Entity {

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
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  phone_number: number;

  @property({
    type: 'number',
    required: true,
  })
  user_type: number;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  @hasMany(() => RestaurantReview)
  restaurantReviews: RestaurantReview[];

<<<<<<< HEAD
  @hasMany(() => Order)
  orders: Order[];

=======
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
