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
  Station,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductStationController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/station', {
    responses: {
      '200': {
        description: 'Station belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Station)},
          },
        },
      },
    },
  })
  async getStation(
    @param.path.number('id') id: typeof Product.prototype.id,
  ): Promise<Station> {
    return this.productRepository.station(id);
  }
}
