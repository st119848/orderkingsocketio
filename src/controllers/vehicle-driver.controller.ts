import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehicle,
  Driver,
} from '../models';
import {VehicleRepository} from '../repositories';

export class VehicleDriverController {
  constructor(
    @repository(VehicleRepository)
    public vehicleRepository: VehicleRepository,
  ) { }

  @get('/vehicles/{id}/driver', {
    responses: {
      '200': {
        description: 'Driver belonging to Vehicle',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Driver)},
          },
        },
      },
    },
  })
  async getDriver(
    @param.path.number('id') id: typeof Vehicle.prototype.id,
  ): Promise<Driver> {
    return this.vehicleRepository.driver(id);
  }
}
