import {Entity, model, property, hasMany} from '@loopback/repository';
import {Station} from './station.model';
import {Table} from './table.model';

@model({settings: {}})
export class Branch extends Entity {
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
  branch_name: string;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  store_type: number;

  @property({
    type: 'string',
    required: true,
  })
  phone_number: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @property({
    type: 'string',
  })
  about_us?: string;

  @property({
    type: 'object',
    default: [],
  })
  covered_photos?: object;

  @property({
    type: 'string',
    required: true,
  })
  opening_hour: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  opening_days: string[];

  @property({
    type: 'number',
  })
  restaurantId?: number;

  @hasMany(() => Station)
  stations: Station[];

  @hasMany(() => Table)
  tables: Table[];

  constructor(data?: Partial<Branch>) {
    super(data);
  }
}

export interface BranchRelations {
  // describe navigational properties here
}

export type BranchWithRelations = Branch & BranchRelations;
