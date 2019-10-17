import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Group, GroupRelations, Employee, Branch} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EmployeeRepository} from './employee.repository';
import {BranchRepository} from './branch.repository';

export class GroupRepository extends DefaultCrudRepository<
  Group,
  typeof Group.prototype.id,
  GroupRelations
> {

  public readonly employees: HasManyRepositoryFactory<Employee, typeof Group.prototype.id>;

  public readonly branch: BelongsToAccessor<Branch, typeof Group.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>, @repository.getter('BranchRepository') protected branchRepositoryGetter: Getter<BranchRepository>,
  ) {
    super(Group, dataSource);
    this.branch = this.createBelongsToAccessorFor('branch', branchRepositoryGetter,);
    this.employees = this.createHasManyRepositoryFactoryFor('employees', employeeRepositoryGetter,);
  }
}
