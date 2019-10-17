import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Product,
  Branch,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductBranchController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/branch', {
    responses: {
      '200': {
        description: 'Branch belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Branch)},
          },
        },
      },
    },
  })
  async getBranch(
    @param.path.number('id') id: typeof Product.prototype.id,
  ): Promise<Branch> {
    return this.productRepository.branch(id);
  }
}
