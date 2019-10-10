import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class PrintLayout extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  printer: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  greetings: string;

  @property({
    type: 'string',
    required: true,
  })
  big_font_name: string;

  @property({
    type: 'number',
    required: true,
  })
  big_font_size: number;

  @property({
    type: 'string',
    required: true,
  })
  small_font_name: string;

  @property({
    type: 'number',
    required: true,
  })
  small_font_size: number;

  @property({
    type: 'boolean',
    required: true,
  })
  is_shown_total_price: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  is_shown_vat: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  is_shown_waiter_time: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  is_shown_customers: boolean;

  @property({
    type: 'number',
  })
  branchId?: number;

  constructor(data?: Partial<PrintLayout>) {
    super(data);
  }
}

export interface PrintLayoutRelations {
  // describe navigational properties here
}

export type PrintlayoutWithRelations = PrintLayout & PrintLayoutRelations;
