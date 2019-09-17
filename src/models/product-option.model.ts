import {Entity, model, property, hasMany} from '@loopback/repository';
import {ProductOptionChoice} from './product-option-choice.model';

@model({settings: {}})
export class ProductOption extends Entity {
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
  option_name: string;

  @property({
    type: 'string',
    required: true,
  })
  option_type: string;

  @property({
    type: 'number',
  })
  productId?: number;

  @hasMany(() => ProductOptionChoice)
  productOptionChoices: ProductOptionChoice[];

  constructor(data?: Partial<ProductOption>) {
    super(data);
  }
}

export interface ProductOptionRelations {
  // describe navigational properties here
}

export type ProductOptionWithRelations = ProductOption & ProductOptionRelations;
