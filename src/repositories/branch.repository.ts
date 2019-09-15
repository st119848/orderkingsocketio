import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Branch, BranchRelations, Station} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {StationRepository} from './station.repository';

export class BranchRepository extends DefaultCrudRepository<
  Branch,
  typeof Branch.prototype.id,
  BranchRelations
> {

  public readonly stations: HasManyRepositoryFactory<Station, typeof Branch.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('StationRepository') protected stationRepositoryGetter: Getter<StationRepository>,
  ) {
    super(Branch, dataSource);
    this.stations = this.createHasManyRepositoryFactoryFor('stations', stationRepositoryGetter,);
  }
}
