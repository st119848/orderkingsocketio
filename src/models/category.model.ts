<<<<<<< HEAD
import { Entity, model, property, belongsTo } from "@loopback/repository";
import { Branch } from "./branch.model";

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
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
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

  @hasMany(() => Product)
  products: Product[];
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
