import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class RestaurantReward extends Entity {
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
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  discount_type: number;

  @property({
    type: 'number',
    required: true,
  })
  discount: number;

  @property({
    type: 'number',
    required: true,
  })
  number_of_stamp: number;

  @property({
    type: 'date',
    required: true,
  })
  start_date: string;

  @property({
    type: 'date',
    required: true,
  })
  end_date: string;

  @property({
    type: 'number',
  })
  restaurantId?: number;

  constructor(data?: Partial<RestaurantReward>) {
    super(data);
  }
}

export interface RestaurantRewardRelations {
  // describe navigational properties here
}

export type RestaurantRewardWithRelations = RestaurantReward & RestaurantRewardRelations;
