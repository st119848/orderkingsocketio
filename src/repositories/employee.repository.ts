import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
<<<<<<< HEAD
import {Employee, EmployeeRelations, User, Branch} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {BranchRepository} from './branch.repository';
=======
import {Employee, EmployeeRelations, User} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Employee.prototype.id>;

<<<<<<< HEAD
  public readonly branch: BelongsToAccessor<Branch, typeof Employee.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('BranchRepository') protected branchRepositoryGetter: Getter<BranchRepository>,
  ) {
    super(Employee, dataSource);
    this.branch = this.createBelongsToAccessorFor('group', branchRepositoryGetter,);
=======
  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Employee, dataSource);
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
  }
}
