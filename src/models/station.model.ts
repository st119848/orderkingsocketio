<<<<<<< HEAD
import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Product} from './product.model';
import {Branch} from './branch.model';
=======
import {Entity, model, property, hasMany} from '@loopback/repository';
import {Product} from './product.model';
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254

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
<<<<<<< HEAD
  @hasMany(() => Product)
  products: Product[];

  @belongsTo(() => Branch)
  branchId: number;

=======

  @property({
    type: 'number',
  })
  branchId?: number;

  @hasMany(() => Product)
  products: Product[];

>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  constructor(data?: Partial<Station>) {
    super(data);
  }
}

export interface StationRelations {
  // describe navigational properties here
}

export type StationWithRelations = Station & StationRelations;
