import {belongsTo, model, property, Entity, hasMany} from '@loopback/repository';
import {User} from '.';
import {BankAccount} from './bank-account.model';

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

  @belongsTo(() => User)
  userId: number;

  @hasMany(() => BankAccount)
  bankAccounts: BankAccount[];

  constructor(data?: Partial<Driver>) {
    super(data);
  }

}

export interface DriverRelations {
}

export type DriverWithRelations = Driver & DriverRelations;
