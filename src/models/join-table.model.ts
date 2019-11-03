import { Entity, model, property } from "@loopback/repository";

@model({ settings: {} })
export class JoinTable extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true
  })
  id?: number;

  @property({
    type: "number",
    required: true
  })
  tableId: number;

  @property({
    type: "array",
    itemType: "number",
    required: true
  })
  customersId: number[];

  @property({
    type: "date",
    default: "now"
  })
  createTime?: string;

  @property({
    type: "array",
    itemType: "number"
  })
  ordersId: number[];

  @property({
    type: "string"
  })
  status?: string;

  constructor(data?: Partial<JoinTable>) {
    super(data);
  }
}

export interface JoinTableRelations {
  // describe navigational properties here
}

export type JoinTableWithRelations = JoinTable & JoinTableRelations;
