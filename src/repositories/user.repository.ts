import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Customer, Driver, Employee} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CustomerRepository} from './customer.repository';
import {DriverRepository} from './driver.repository';
import {EmployeeRepository} from './employee.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly customers: HasManyRepositoryFactory<Customer, typeof User.prototype.id>;

  public readonly drivers: HasManyRepositoryFactory<Driver, typeof User.prototype.id>;

  public readonly employees: HasManyRepositoryFactory<Employee, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('DriverRepository') protected driverRepositoryGetter: Getter<DriverRepository>, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(User, dataSource);
    this.employees = this.createHasManyRepositoryFactoryFor('employees', employeeRepositoryGetter,);
    this.drivers = this.createHasManyRepositoryFactoryFor('drivers', driverRepositoryGetter,);
    this.customers = this.createHasManyRepositoryFactoryFor('customers', customerRepositoryGetter,);
  }
}
