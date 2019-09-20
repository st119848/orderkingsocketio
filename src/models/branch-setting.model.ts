import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Branch} from './branch.model';

@model({settings: {}})
export class BranchSetting extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'boolean',
    required: true,
  })
  enable_to_reserve: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  enable_service_charge: boolean;

  @property({
    type: 'number',
    required: true,
  })
  service_charge_rate: number;

  @property({
    type: 'boolean',
    required: true,
  })
  enable_tax: boolean;

  @property({
    type: 'number',
    required: true,
  })
  tax_rate: number;

  @property({
    type: 'boolean',
    required: true,
  })
  enable_auto_print_order: boolean;

  @belongsTo(() => Branch)
  branchId: number;

  constructor(data?: Partial<BranchSetting>) {
    super(data);
  }
}

export interface BranchSettingRelations {
  // describe navigational properties here
}

export type BranchSettingWithRelations = BranchSetting & BranchSettingRelations;
