import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Branch, BranchRelations, Station, Table, Printer, PrintLayout} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {StationRepository} from './station.repository';
import {TableRepository} from './table.repository';
import {PrinterRepository} from './printer.repository';
import {PrintLayoutRepository} from './print-layout.repository';

export class BranchRepository extends DefaultCrudRepository<
  Branch,
  typeof Branch.prototype.id,
  BranchRelations
> {

  public readonly stations: HasManyRepositoryFactory<Station, typeof Branch.prototype.id>;

  public readonly tables: HasManyRepositoryFactory<Table, typeof Branch.prototype.id>;

  public readonly printers: HasManyRepositoryFactory<Printer, typeof Branch.prototype.id>;

  public readonly printLayouts: HasManyRepositoryFactory<PrintLayout, typeof Branch.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('StationRepository') protected stationRepositoryGetter: Getter<StationRepository>, @repository.getter('TableRepository') protected tableRepositoryGetter: Getter<TableRepository>, @repository.getter('PrinterRepository') protected printerRepositoryGetter: Getter<PrinterRepository>, @repository.getter('PrintLayoutRepository') protected printLayoutRepositoryGetter: Getter<PrintLayoutRepository>,
  ) {
    super(Branch, dataSource);
    this.printLayouts = this.createHasManyRepositoryFactoryFor('printLayouts', printLayoutRepositoryGetter,);
    this.printers = this.createHasManyRepositoryFactoryFor('printers', printerRepositoryGetter,);
    this.tables = this.createHasManyRepositoryFactoryFor('tables', tableRepositoryGetter,);
    this.stations = this.createHasManyRepositoryFactoryFor('stations', stationRepositoryGetter,);
  }
}
