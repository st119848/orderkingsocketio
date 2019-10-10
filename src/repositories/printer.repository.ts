import {DefaultCrudRepository} from '@loopback/repository';
import {Printer, PrinterRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PrinterRepository extends DefaultCrudRepository<
  Printer,
  typeof Printer.prototype.id,
  PrinterRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Printer, dataSource);
  }
}
