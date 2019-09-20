import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class DriverReview extends Entity {
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
  rating_type: number;

  @property({
    type: 'string',
    required: true,
  })
  review_comment: string;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  @property({
    type: 'string',
    required: true,
  })
  reviewer_name: string;

  @property({
    type: 'string',
  })
  reviewer_photo: string;

  @property({
    type: 'number',
  })
  driverId?: number;

  constructor(data?: Partial<DriverReview>) {
    super(data);
  }
}

export interface DriverReviewRelations {
  // describe navigational properties here
}

export type DriverReviewWithRelations = DriverReview & DriverReviewRelations;
