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
  })
  id?: number;

  @property({
    type: "string",
    required: true
  })
  name: string;

  @belongsTo(() => Branch)
  branchId: number;

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
