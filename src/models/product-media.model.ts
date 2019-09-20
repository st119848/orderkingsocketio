import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class ProductMedia extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  url: string;

  @property({
    type: 'string',
    required: true,
  })
  key: string;

  @property({
    type: 'number',
    required: true,
  })
  type: number;

  @property({
    type: 'number',
  })
  productId?: number;

  constructor(data?: Partial<ProductMedia>) {
    super(data);
  }
}

export interface ProductMediaRelations {
  // describe navigational properties here
}

export type ProductMediaWithRelations = ProductMedia & ProductMediaRelations;
