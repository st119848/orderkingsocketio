import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  item_name: string;

  @property({
    type: 'string',
  })
  item_description?: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    default: 0,
  })
  prepareing_time_minutes?: number;

  @property({
    type: 'string',
    required: true,
  })
  category: string;


  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
