import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
  BelongsToAccessor
} from "@loopback/repository";
import { Station, StationRelations, Product, Branch } from "../models";
import { DbDataSource } from "../datasources";
import { inject, Getter } from "@loopback/core";
import { ProductRepository } from "./product.repository";
import { BranchRepository } from "./branch.repository";

export class StationRepository extends DefaultCrudRepository<
  Station,
  typeof Station.prototype.id,
  StationRelations
> {
  public readonly products: HasManyRepositoryFactory<
    Product,
    typeof Station.prototype.id
  >;

  public readonly branch: BelongsToAccessor<
    Branch,
    typeof Station.prototype.id
  >;

  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("ProductRepository")
    protected productRepositoryGetter: Getter<ProductRepository>,
    @repository.getter("BranchRepository")
    protected branchRepositoryGetter: Getter<BranchRepository>
  ) {
    super(Station, dataSource);
    this.branch = this.createBelongsToAccessorFor(
      "branch",
      branchRepositoryGetter
    );
    this.products = this.createHasManyRepositoryFactoryFor(
      "products",
      productRepositoryGetter
    );
    this.registerInclusionResolver("products", this.products.inclusionResolver);
  }
}
