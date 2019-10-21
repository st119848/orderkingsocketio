import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
  BelongsToAccessor
} from "@loopback/repository";
import {
  Product,
  ProductRelations,
  ProductOption,
  ProductMedia,
  Branch,
  Station
} from "../models";
import { DbDataSource } from "../datasources";
import { inject, Getter } from "@loopback/core";
import { ProductOptionRepository } from "./product-option.repository";
import { ProductMediaRepository } from "./product-media.repository";
import { BranchRepository } from "./branch.repository";
import { StationRepository } from "./station.repository";

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {
  public readonly productOptions: HasManyRepositoryFactory<
    ProductOption,
    typeof Product.prototype.id
  >;

  public readonly productMedias: HasManyRepositoryFactory<
    ProductMedia,
    typeof Product.prototype.id
  >;

  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("ProductOptionRepository")
    protected productOptionRepositoryGetter: Getter<ProductOptionRepository>,
    @repository.getter("ProductMediaRepository")
    protected productMediaRepositoryGetter: Getter<ProductMediaRepository>
  ) {
    super(Product, dataSource);
    this.productMedias = this.createHasManyRepositoryFactoryFor(
      "productMedias",
      productMediaRepositoryGetter
    );
    this.productOptions = this.createHasManyRepositoryFactoryFor(
      "productOptions",
      productOptionRepositoryGetter
    );
  }
}
