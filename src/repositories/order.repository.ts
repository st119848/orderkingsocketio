import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor
} from "@loopback/repository";
import { Order, OrderRelations, Branch } from "../models";
import { DbDataSource } from "../datasources";
import { inject, Getter } from "@loopback/core";
import { BranchRepository } from "./branch.repository";

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {
  public readonly branch: BelongsToAccessor<Branch, typeof Order.prototype.id>;
  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("BranchRepository")
    protected branchRepositoryGetter: Getter<BranchRepository>
  ) {
    super(Order, dataSource);
    this.branch = this.createBelongsToAccessorFor(
      "branch",
      branchRepositoryGetter
    );
  }
}
