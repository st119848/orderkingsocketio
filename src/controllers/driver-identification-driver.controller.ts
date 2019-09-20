import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DriverIdentification,
  Driver,
} from '../models';
import {DriverIdentificationRepository} from '../repositories';

export class DriverIdentificationDriverController {
  constructor(
    @repository(DriverIdentificationRepository)
    public driverIdentificationRepository: DriverIdentificationRepository,
  ) { }

  @get('/driver-identifications/{id}/driver', {
    responses: {
      '200': {
        description: 'Driver belonging to DriverIdentification',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Driver)},
          },
        },
      },
    },
  })
  async getDriver(
    @param.path.number('id') id: typeof DriverIdentification.prototype.id,
  ): Promise<Driver> {
    return this.driverIdentificationRepository.driver(id);
  }
}
