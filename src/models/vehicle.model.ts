import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Driver} from './driver.model';

@model({settings: {}})
export class Vehicle extends Entity {
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
  type_of_vehicle: string;

  @property({
    type: 'string',
    required: true,
  })
  brand: string;

  @property({
    type: 'string',
    required: true,
  })
  model: string;

  @property({
    type: 'string',
    required: true,
  })
  registration_document: string;

  @property({
    type: 'string',
    required: true,
  })
  car_insurance: string;

  @property({
    type: 'date',
    required: true,
  })
  id_card_issued_date: string;

  @property({
    type: 'string',
    required: true,
  })
  photo: string;

  @belongsTo(() => Driver)
  driverId: number;

  constructor(data?: Partial<Vehicle>) {
    super(data);
  }
}

export interface VehicleRelations {
  // describe navigational properties here
}

export type VehicleWithRelations = Vehicle & VehicleRelations;
