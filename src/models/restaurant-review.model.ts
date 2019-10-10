import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class RestaurantReview extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  rating: number;

  @property({
    type: 'string',
    required: true,
  })
  details: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  photos: string[];

  @property({
    type: 'number',
  })
  userId?: number;

  @property({
    type: 'number',
  })
  restaurantId?: number;

  constructor(data?: Partial<RestaurantReview>) {
    super(data);
  }
}

export interface RestaurantReviewRelations {
  // describe navigational properties here
}

export type RestaurantReviewWithRelations = RestaurantReview & RestaurantReviewRelations;
