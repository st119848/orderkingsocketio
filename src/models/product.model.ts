import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {ProductOption} from './product-option.model';
import {ProductMedia} from './product-media.model';
import {Branch} from './branch.model';
import {Station} from './station.model';

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
  @hasMany(() => ProductMedia)
  productMedias: ProductMedia[];

  @belongsTo(() => Branch)
  branchId: number;

  @belongsTo(() => Station)
  stationId: number;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
