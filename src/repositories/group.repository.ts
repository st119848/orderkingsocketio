<<<<<<< HEAD
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Group, GroupRelations, Employee, Branch} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EmployeeRepository} from './employee.repository';
import {BranchRepository} from './branch.repository';
=======
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Group, GroupRelations, Employee} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EmployeeRepository} from './employee.repository';
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254

export class GroupRepository extends DefaultCrudRepository<
  Group,
  typeof Group.prototype.id,
  GroupRelations
> {

  public readonly employees: HasManyRepositoryFactory<Employee, typeof Group.prototype.id>;

<<<<<<< HEAD
  public readonly branch: BelongsToAccessor<Branch, typeof Group.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>, @repository.getter('BranchRepository') protected branchRepositoryGetter: Getter<BranchRepository>,
  ) {
    super(Group, dataSource);
    this.branch = this.createBelongsToAccessorFor('branch', branchRepositoryGetter,);
=======
  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Group, dataSource);
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
    this.employees = this.createHasManyRepositoryFactoryFor('employees', employeeRepositoryGetter,);
  }
}
