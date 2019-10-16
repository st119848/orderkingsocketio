import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Order,
  Branch,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderBranchController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/branch', {
    responses: {
      '200': {
        description: 'Branch belonging to Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Branch)},
          },
        },
      },
    },
  })
  async getBranch(
    @param.path.number('id') id: typeof Order.prototype.id,
  ): Promise<Branch> {
    return this.orderRepository.branch(id);
  }
}
