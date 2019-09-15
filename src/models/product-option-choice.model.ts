import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class ProductOptionChoice extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  choice_name: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
  })
  productOptionId?: number;

  constructor(data?: Partial<ProductOptionChoice>) {
    super(data);
  }
}

export interface ProductOptionChoiceRelations {
  // describe navigational properties here
}

export type ProductOptionChoiceWithRelations = ProductOptionChoice & ProductOptionChoiceRelations;
