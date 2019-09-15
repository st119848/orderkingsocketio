import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class ProductOption extends Entity {
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
  option_name: string;

  @property({
    type: 'string',
    required: true,
  })
  option_type: string;


  constructor(data?: Partial<ProductOption>) {
    super(data);
  }
}

export interface ProductOptionRelations {
  // describe navigational properties here
}

export type ProductOptionWithRelations = ProductOption & ProductOptionRelations;
