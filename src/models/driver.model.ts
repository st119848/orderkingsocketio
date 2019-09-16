import {belongsTo, model, property, Entity} from '@loopback/repository';
import {User} from '.';
import { UserWithRelations } from './user.model';

@model({settings: {}})

export class Driver extends Entity {
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
  firstname: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'buffer',
    required: true,
  })
  id_card_photo: Buffer;

  constructor(data?: Partial<Driver>) {
    super(data);
  }

  @belongsTo(() => User,{keyTo:'pk'})
  userId: number
}

export interface DriverRelations {
  user?: UserWithRelations
}

export type DriverWithRelations = Driver & DriverRelations;
