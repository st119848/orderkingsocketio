import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory
} from "@loopback/repository";
import {
  Branch,
  BranchRelations,
  Station,
  Table,
  Printer,
  PrintLayout,
  Group,
  BankAccount,
  CreditCard,
  Order,
  Category,
  Reservation,
  Product
} from "../models";
import { DbDataSource } from "../datasources";
import { inject, Getter } from "@loopback/core";
import { StationRepository } from "./station.repository";
import { TableRepository } from "./table.repository";
import { PrinterRepository } from "./printer.repository";
import { PrintLayoutRepository } from "./print-layout.repository";
import { GroupRepository } from "./group.repository";
import { BankAccountRepository } from "./bank-account.repository";
import { CreditCardRepository } from "./credit-card.repository";
import { OrderRepository } from "./order.repository";
import { CategoryRepository } from "./category.repository";
import { ReservationRepository } from "./reservation.repository";
import { ProductRepository } from "./product.repository";

export class BranchRepository extends DefaultCrudRepository<
  Branch,
  typeof Branch.prototype.id,
  BranchRelations
> {
  public readonly stations: HasManyRepositoryFactory<
    Station,
    typeof Branch.prototype.id
  >;

  public readonly tables: HasManyRepositoryFactory<
    Table,
    typeof Branch.prototype.id
  >;

  public readonly printers: HasManyRepositoryFactory<
    Printer,
    typeof Branch.prototype.id
  >;

  public readonly printLayouts: HasManyRepositoryFactory<
    PrintLayout,
    typeof Branch.prototype.id
  >;

  public readonly groups: HasManyRepositoryFactory<
    Group,
    typeof Branch.prototype.id
  >;

  public readonly bankAccounts: HasManyRepositoryFactory<
    BankAccount,
    typeof Branch.prototype.id
  >;

  public readonly creditCards: HasManyRepositoryFactory<
    CreditCard,
    typeof Branch.prototype.id
  >;

  public readonly orders: HasManyRepositoryFactory<
    Order,
    typeof Branch.prototype.id
  >;

  public readonly categories: HasManyRepositoryFactory<
    Category,
    typeof Branch.prototype.id
  >;

  public readonly reservations: HasManyRepositoryFactory<
    Reservation,
    typeof Branch.prototype.id
  >;

  public readonly products: HasManyRepositoryFactory<
    Product,
    typeof Branch.prototype.id
  >;

  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("StationRepository")
    protected stationRepositoryGetter: Getter<StationRepository>,
    @repository.getter("ProductRepository")
    protected productRepositoryGetter: Getter<ProductRepository>,
    @repository.getter("TableRepository")
    protected tableRepositoryGetter: Getter<TableRepository>,
    @repository.getter("PrinterRepository")
    protected printerRepositoryGetter: Getter<PrinterRepository>,
    @repository.getter("PrintLayoutRepository")
    protected printLayoutRepositoryGetter: Getter<PrintLayoutRepository>,
    @repository.getter("GroupRepository")
    protected groupRepositoryGetter: Getter<GroupRepository>,
    @repository.getter("BankAccountRepository")
    protected bankAccountRepositoryGetter: Getter<BankAccountRepository>,
    @repository.getter("CreditCardRepository")
    protected creditCardRepositoryGetter: Getter<CreditCardRepository>,
    @repository.getter("OrderRepository")
    protected orderRepositoryGetter: Getter<OrderRepository>,
    @repository.getter("CategoryRepository")
    protected categoryRepositoryGetter: Getter<CategoryRepository>,
    @repository.getter("ReservationRepository")
    protected reservationRepositoryGetter: Getter<ReservationRepository>
  ) {
    super(Branch, dataSource);

    this.reservations = this.createHasManyRepositoryFactoryFor(
      "reservations",
      reservationRepositoryGetter
    );
    this.categories = this.createHasManyRepositoryFactoryFor(
      "categories",
      categoryRepositoryGetter
    );
    this.orders = this.createHasManyRepositoryFactoryFor(
      "orders",
      orderRepositoryGetter
    );
    this.creditCards = this.createHasManyRepositoryFactoryFor(
      "creditCards",
      creditCardRepositoryGetter
    );
    this.bankAccounts = this.createHasManyRepositoryFactoryFor(
      "bankAccounts",
      bankAccountRepositoryGetter
    );
    this.groups = this.createHasManyRepositoryFactoryFor(
      "groups",
      groupRepositoryGetter
    );
    this.printLayouts = this.createHasManyRepositoryFactoryFor(
      "printLayouts",
      printLayoutRepositoryGetter
    );
    this.printers = this.createHasManyRepositoryFactoryFor(
      "printers",
      printerRepositoryGetter
    );
    this.tables = this.createHasManyRepositoryFactoryFor(
      "tables",
      tableRepositoryGetter
    );
    this.stations = this.createHasManyRepositoryFactoryFor(
      "stations",
      stationRepositoryGetter
    );
    this.products = this.createHasManyRepositoryFactoryFor(
      "products",
      productRepositoryGetter
    );
  }
}
