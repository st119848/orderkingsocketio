import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Station extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  station_name: string;

  @property({
    type: 'string',
  })
  station_description?: string;

  @property({
    type: 'string',
  })
  ticket_printer?: string;


  constructor(data?: Partial<Station>) {
    super(data);
  }
}

export interface StationRelations {
  // describe navigational properties here
}

export type StationWithRelations = Station & StationRelations;
