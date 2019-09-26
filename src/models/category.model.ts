<<<<<<< HEAD
import {
  Entity,
  model,
  property,
  belongsTo,
  hasMany
} from "@loopback/repository";
import { Branch } from "./branch.model";
import { Product } from "./product.model";

@model({ settings: {} })
export class Category extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true
=======
import {Entity, model, property, hasMany} from '@loopback/repository';
import {Product} from './product.model';

@model({settings: {}})
export class Category extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
>>>>>>> add category
  })
  id?: number;

  @property({
<<<<<<< HEAD
    type: "string",
    required: true
  })
  name: string;

  @belongsTo(() => Branch)
  branchId: number;

=======
    type: 'string',
    required: true,
  })
  name: string;

>>>>>>> add category
  @hasMany(() => Product)
  products: Product[];

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
