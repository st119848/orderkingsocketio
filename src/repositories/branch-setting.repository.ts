import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {BranchSetting, BranchSettingRelations, Branch} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BranchRepository} from './branch.repository';

export class BranchSettingRepository extends DefaultCrudRepository<
  BranchSetting,
  typeof BranchSetting.prototype.id,
  BranchSettingRelations
> {

  public readonly branch: BelongsToAccessor<Branch, typeof BranchSetting.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('BranchRepository') protected branchRepositoryGetter: Getter<BranchRepository>,
  ) {
    super(BranchSetting, dataSource);
    this.branch = this.createBelongsToAccessorFor('branch', branchRepositoryGetter,);
  }
}
