import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DriverWallet,
  Driver,
} from '../models';
import {DriverWalletRepository} from '../repositories';

export class DriverWalletDriverController {
  constructor(
    @repository(DriverWalletRepository)
    public driverWalletRepository: DriverWalletRepository,
  ) { }

  @get('/driver-wallets/{id}/driver', {
    responses: {
      '200': {
        description: 'Driver belonging to DriverWallet',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Driver)},
          },
        },
      },
    },
  })
  async getDriver(
    @param.path.number('id') id: typeof DriverWallet.prototype.id,
  ): Promise<Driver> {
    return this.driverWalletRepository.driver(id);
  }
}
