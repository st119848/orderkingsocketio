import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Category,
  Branch,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryBranchController {
  constructor(
    @repository(CategoryRepository)
    public categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/branch', {
    responses: {
      '200': {
        description: 'Branch belonging to Category',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Branch)},
          },
        },
      },
    },
  })
  async getBranch(
    @param.path.number('id') id: typeof Category.prototype.id,
  ): Promise<Branch> {
    return this.categoryRepository.branch(id);
  }
}
