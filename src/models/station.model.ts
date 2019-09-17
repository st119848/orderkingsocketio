import {Entity, model, property, hasMany} from '@loopback/repository';
import {Product} from './product.model';

@model({settings: {}})
export class Station extends Entity {
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
  station_name: string;

  @property({
    type: 'string',
  })
  station_description?: string;

  @property({
    type: 'string',
  })
  ticket_printer?: string;

  @property({
    type: 'number',
  })
  branchId?: number;

  @hasMany(() => Product)
  products: Product[];

  constructor(data?: Partial<Station>) {
    super(data);
  }
}

export interface StationRelations {
  // describe navigational properties here
}

export type StationWithRelations = Station & StationRelations;
