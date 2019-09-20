import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {DriverReview} from '../models';
import {DriverReviewRepository} from '../repositories';

export class DriverReviewController {
  constructor(
    @repository(DriverReviewRepository)
    public driverReviewRepository : DriverReviewRepository,
  ) {}

  @post('/driver-reviews', {
    responses: {
      '200': {
        description: 'DriverReview model instance',
        content: {'application/json': {schema: getModelSchemaRef(DriverReview)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DriverReview, {exclude: ['id']}),
        },
      },
    })
    driverReview: Omit<DriverReview, 'id'>,
  ): Promise<DriverReview> {
    return this.driverReviewRepository.create(driverReview);
  }

  @get('/driver-reviews', {
    responses: {
      '200': {
        description: 'Array of DriverReview model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DriverReview)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(DriverReview)) filter?: Filter<DriverReview>,
  ): Promise<DriverReview[]> {
    return this.driverReviewRepository.find(filter);
  }

  @get('/driver-reviews/{id}', {
    responses: {
      '200': {
        description: 'DriverReview model instance',
        content: {'application/json': {schema: getModelSchemaRef(DriverReview)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<DriverReview> {
    return this.driverReviewRepository.findById(id);
  }

  @patch('/driver-reviews/{id}', {
    responses: {
      '204': {
        description: 'DriverReview PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DriverReview, {partial: true}),
        },
      },
    })
    driverReview: DriverReview,
  ): Promise<void> {
    await this.driverReviewRepository.updateById(id, driverReview);
  }

  @del('/driver-reviews/{id}', {
    responses: {
      '204': {
        description: 'DriverReview DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.driverReviewRepository.deleteById(id);
  }
}
