import { Entity, model, property } from "@loopback/repository";

@model({ settings: {} })
export class Queue extends Entity {
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
  branchId: number;

  @property({
    type: "number",
    required: true
  })
  guestId: number;

  @property({
    type: "string",
    required: true
  })
  qId: string;

  @property({
    type: "number",
    required: true
  })
  employeeId: number;

  @property({
    type: "number",
    required: true
  })
  guestNumber: number;

  @property({
    type: "string"
  })
  status?: string;

  @property({
    type: "date",
    default: "now"
  })
  create_time?: string;

  @property({
    type: "date",
    default: "now"
  })
  modify_time?: string;

  @property({
    type: "date",
    required: true
  })
  reservation_time: string;

  constructor(data?: Partial<Queue>) {
    super(data);
  }
}

export interface QueueRelations {
  // describe navigational properties here
}

export type QueueWithRelations = Queue & QueueRelations;
