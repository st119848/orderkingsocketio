import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Driver} from './driver.model';

@model({settings: {}})
export class DriverIdentification extends Entity {
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
  portrait_photo: string;

  @property({
    type: 'string',
    required: true,
  })
  protrait_with_id_card: string;

  @property({
    type: 'string',
    required: true,
  })
  driving_license_photo: string;

  @belongsTo(() => Driver)
  driverId: number;

  constructor(data?: Partial<DriverIdentification>) {
    super(data);
  }
}

export interface DriverIdentificationRelations {
  // describe navigational properties here
}

export type DriverIdentificationWithRelations = DriverIdentification & DriverIdentificationRelations;
