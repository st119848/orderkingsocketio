<<<<<<< HEAD
import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {ProductOption} from './product-option.model';
import {ProductMedia} from './product-media.model';
import {Branch} from './branch.model';
import {Station} from './station.model';
=======
import {Entity, model, property, hasMany} from '@loopback/repository';
import {ProductOption} from './product-option.model';
import {ProductMedia} from './product-media.model';
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254

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

<<<<<<< HEAD
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
=======
  @hasMany(() => ProductOption)
  productOptions: ProductOption[];

  @property({
    type: 'number',
  })
  stationId?: number;

  @hasMany(() => ProductMedia)
  productMedias: ProductMedia[];

  @property({
    type: 'number',
  })
  categoryId?: number;
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
