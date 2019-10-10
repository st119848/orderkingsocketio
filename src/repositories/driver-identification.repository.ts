import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DriverIdentification, DriverIdentificationRelations, Driver} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DriverRepository} from './driver.repository';

export class DriverIdentificationRepository extends DefaultCrudRepository<
  DriverIdentification,
  typeof DriverIdentification.prototype.id,
  DriverIdentificationRelations
> {

  public readonly driver: BelongsToAccessor<Driver, typeof DriverIdentification.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DriverRepository') protected driverRepositoryGetter: Getter<DriverRepository>,
  ) {
    super(DriverIdentification, dataSource);
    this.driver = this.createBelongsToAccessorFor('driver', driverRepositoryGetter,);
  }
}
