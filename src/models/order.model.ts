import { Entity, model, property, belongsTo } from "@loopback/repository";
import { Branch } from "./branch.model";

@model({ settings: {} })
export class Order extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true
  })
  id?: number;
  @property({
    type: "number"
  })
  userId?: number;

  @property({
    type: "number"
  })
  table?: number;

  @property({
    type: "array",
    itemType: "object",
    required: true
  })
  products: object[];

  @property({
    type: "date",
    default: "now"
  })
  modifyTime: string;

  @property({
    type: "date",
    default: "now"
  })
  createTime?: string;

  @property({
    type: "string"
  })
  status?: string;

  @property({
    type: "string",
    required: true
  })
  type: string;

  @belongsTo(() => Branch)
  branchId: number;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
