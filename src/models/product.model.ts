import {Entity, model, property, hasMany} from '@loopback/repository';
import {ProductOption} from './product-option.model';
import {ProductMedia} from './product-media.model';

@model({settings: {}})
export class Product extends Entity {
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

  @hasMany(() => ProductOption)
  productOptions: ProductOption[];

  @property({
    type: 'number',
  })
  stationId?: number;

  @hasMany(() => ProductMedia)
  productMedias: ProductMedia[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
