import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  requestBody,
} from '@loopback/rest';
import {
  DriverReview,
} from '../models';
import {DriverRepository} from '../repositories';

export class DriverDriverReviewController {
  constructor(
    @repository(DriverRepository) protected driverRepository: DriverRepository,
  ) { }

  @get('/drivers/{id}/driver-reviews', {
    responses: {
      '200': {
        description: 'Array of DriverReview\'s belonging to Driver',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DriverReview)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DriverReview>,
  ): Promise<DriverReview[]> {
    return this.driverRepository.driverReviews(id).find(filter);
  }

  @patch('/drivers/{id}/driver-reviews', {
    responses: {
      '200': {
        description: 'Driver.DriverReview PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DriverReview, {partial: true}),
        },
      },
    })
    driverReview: Partial<DriverReview>,
    @param.query.object('where', getWhereSchemaFor(DriverReview)) where?: Where<DriverReview>,
  ): Promise<Count> {
    return this.driverRepository.driverReviews(id).patch(driverReview, where);
  }

  @del('/drivers/{id}/driver-reviews', {
    responses: {
      '200': {
        description: 'Driver.DriverReview DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DriverReview)) where?: Where<DriverReview>,
  ): Promise<Count> {
    return this.driverRepository.driverReviews(id).delete(where);
  }
}
