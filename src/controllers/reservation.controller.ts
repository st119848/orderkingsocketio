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
import {Reservation} from '../models';
import {ReservationRepository} from '../repositories';

export class ReservationController {
  constructor(
    @repository(ReservationRepository)
    public reservationRepository : ReservationRepository,
  ) {}

  @post('/reservations', {
    responses: {
      '200': {
        description: 'Reservation model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reservation)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {
            title: 'NewReservation',
            exclude: ['id'],
          }),
        },
      },
    })
    reservation: Omit<Reservation, 'id'>,
  ): Promise<Reservation> {
    return this.reservationRepository.create(reservation);
  }

  @get('/reservations/count', {
    responses: {
      '200': {
        description: 'Reservation model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Reservation)) where?: Where<Reservation>,
  ): Promise<Count> {
    return this.reservationRepository.count(where);
  }

  @get('/reservations', {
    responses: {
      '200': {
        description: 'Array of Reservation model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reservation)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Reservation)) filter?: Filter<Reservation>,
  ): Promise<Reservation[]> {
    return this.reservationRepository.find(filter);
  }

  @patch('/reservations', {
    responses: {
      '200': {
        description: 'Reservation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {partial: true}),
        },
      },
    })
    reservation: Reservation,
    @param.query.object('where', getWhereSchemaFor(Reservation)) where?: Where<Reservation>,
  ): Promise<Count> {
    return this.reservationRepository.updateAll(reservation, where);
  }

  @get('/reservations/{id}', {
    responses: {
      '200': {
        description: 'Reservation model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reservation)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Reservation> {
    return this.reservationRepository.findById(id);
  }

  @patch('/reservations/{id}', {
    responses: {
      '204': {
        description: 'Reservation PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reservation, {partial: true}),
        },
      },
    })
    reservation: Reservation,
  ): Promise<void> {
    await this.reservationRepository.updateById(id, reservation);
  }

  @put('/reservations/{id}', {
    responses: {
      '204': {
        description: 'Reservation PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() reservation: Reservation,
  ): Promise<void> {
    await this.reservationRepository.replaceById(id, reservation);
  }

  @del('/reservations/{id}', {
    responses: {
      '204': {
        description: 'Reservation DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.reservationRepository.deleteById(id);
  }
}
