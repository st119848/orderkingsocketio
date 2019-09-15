import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Branch, BranchRelations, Station, Table} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {StationRepository} from './station.repository';
import {TableRepository} from './table.repository';

export class BranchRepository extends DefaultCrudRepository<
  Branch,
  typeof Branch.prototype.id,
  BranchRelations
> {

  public readonly stations: HasManyRepositoryFactory<Station, typeof Branch.prototype.id>;

  public readonly tables: HasManyRepositoryFactory<Table, typeof Branch.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('StationRepository') protected stationRepositoryGetter: Getter<StationRepository>, @repository.getter('TableRepository') protected tableRepositoryGetter: Getter<TableRepository>,
  ) {
    super(Branch, dataSource);
    this.tables = this.createHasManyRepositoryFactoryFor('tables', tableRepositoryGetter,);
    this.stations = this.createHasManyRepositoryFactoryFor('stations', stationRepositoryGetter,);
  }
}
