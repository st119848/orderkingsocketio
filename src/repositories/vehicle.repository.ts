import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Vehicle, VehicleRelations, Driver} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DriverRepository} from './driver.repository';

export class VehicleRepository extends DefaultCrudRepository<
  Vehicle,
  typeof Vehicle.prototype.id,
  VehicleRelations
> {

  public readonly driver: BelongsToAccessor<Driver, typeof Vehicle.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DriverRepository') protected driverRepositoryGetter: Getter<DriverRepository>,
  ) {
    super(Vehicle, dataSource);
    this.driver = this.createBelongsToAccessorFor('driver', driverRepositoryGetter,);
  }
}
