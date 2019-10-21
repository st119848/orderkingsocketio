import { Entity, model, property, belongsTo } from "@loopback/repository";
import { User } from "./user.model";
import { Branch } from "./branch.model";

@model({ settings: {} })
export class Employee extends Entity {
  @property({
    type: "number",
    id: true,
    generated: true
  })
  id: number;

  @property({
    type: "string",
    required: true
  })
  photo: string;

  @property({
    type: "string",
    required: true
  })
  firstname: string;

  @property({
    type: "string",
    required: true
  })
  lastname: string;
  @belongsTo(() => User)
  userId: number;

  @belongsTo(() => Branch)
  groupId: number;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
