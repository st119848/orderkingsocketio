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
  Station,
  Category
} from "../models";
import { DbDataSource } from "../datasources";
import { inject, Getter } from "@loopback/core";
import { ProductOptionRepository } from "./product-option.repository";
import { ProductMediaRepository } from "./product-media.repository";
import { BranchRepository } from "./branch.repository";
import { StationRepository } from "./station.repository";
<<<<<<< HEAD
<<<<<<< HEAD
import { CategoryRepository } from "./category.repository";
=======
>>>>>>> current
=======
import { CategoryRepository } from "./category.repository";
>>>>>>> update

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> update
  public readonly category: BelongsToAccessor<
    Category,
    typeof Category.prototype.id
  >;
  public readonly station: BelongsToAccessor<
    Station,
    typeof Station.prototype.id
  >;
<<<<<<< HEAD
=======
>>>>>>> current
=======
>>>>>>> update

  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("ProductOptionRepository")
    protected productOptionRepositoryGetter: Getter<ProductOptionRepository>,
    @repository.getter("ProductMediaRepository")
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> update
    protected productMediaRepositoryGetter: Getter<ProductMediaRepository>,
    @repository.getter("CategoryRepository")
    protected categoryRepositoryGetter: Getter<CategoryRepository>,
    @repository.getter("StationRepository")
    protected stationRepositoryGetter: Getter<StationRepository>
<<<<<<< HEAD
=======
    protected productMediaRepositoryGetter: Getter<ProductMediaRepository>
>>>>>>> current
=======
>>>>>>> update
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> update
    this.station = this.createBelongsToAccessorFor(
      "staion",
      stationRepositoryGetter
    );
<<<<<<< HEAD
=======
>>>>>>> current
=======
>>>>>>> update
  }
}
