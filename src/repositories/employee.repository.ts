import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor
} from "@loopback/repository";
import { Employee, EmployeeRelations, User, Branch } from "../models";
import { DbDataSource } from "../datasources";
import { inject, Getter } from "@loopback/core";
import { UserRepository } from "./user.repository";
import { BranchRepository } from "./branch.repository";

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {
  public readonly user: BelongsToAccessor<User, typeof Employee.prototype.id>;

  public readonly branch: BelongsToAccessor<
    Branch,
    typeof Employee.prototype.id
  >;

  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("UserRepository")
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter("BranchRepository")
    protected branchRepositoryGetter: Getter<BranchRepository>
  ) {
    super(Employee, dataSource);
    this.branch = this.createBelongsToAccessorFor(
      "group",
      branchRepositoryGetter
    );
    this.user = this.createBelongsToAccessorFor("user", userRepositoryGetter);
  }
}
