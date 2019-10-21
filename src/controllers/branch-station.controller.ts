import {
  Count,
  CountSchema,
  Filter,
  repository,
<<<<<<< HEAD
  Where
} from "@loopback/repository";
=======
  Where,
} from '@loopback/repository';
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
<<<<<<< HEAD
  post,
  requestBody
} from "@loopback/rest";
import { Branch, Station } from "../models";
import { BranchRepository } from "../repositories";

export class BranchStationController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository
  ) {}

  @get("/branches/{id}/stations", {
    responses: {
      "200": {
        description: "Array of Station's belonging to Branch",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(Station) }
          }
        }
      }
    }
  })
  async find(
    @param.path.number("id") id: number,
    @param.query.object("filter") filter?: Filter<Station>
=======
  requestBody,
} from '@loopback/rest';
import {
  Station,
} from '../models';
import {BranchRepository} from '../repositories';

export class BranchStationController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository,
  ) { }

  @get('/branches/{id}/stations', {
    responses: {
      '200': {
        description: 'Array of Station\'s belonging to Branch',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Station)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Station>,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  ): Promise<Station[]> {
    return this.branchRepository.stations(id).find(filter);
  }

<<<<<<< HEAD
  @post("/branches/{id}/stations", {
    responses: {
      "200": {
        description: "Branch model instance",
        content: { "application/json": { schema: getModelSchemaRef(Station) } }
      }
    }
  })
  async create(
    @param.path.number("id") id: typeof Branch.prototype.id,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Station, {
            exclude: ["id"],
            optional: ["branchId"]
          })
        }
      }
    })
    station: Omit<Station, "id">
  ): Promise<Station> {
    return this.branchRepository.stations(id).create(station);
  }

  @patch("/branches/{id}/stations", {
    responses: {
      "200": {
        description: "Branch.Station PATCH success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async patch(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Station, { partial: true })
        }
      }
    })
    station: Partial<Station>,
    @param.query.object("where", getWhereSchemaFor(Station))
    where?: Where<Station>
=======
  @patch('/branches/{id}/stations', {
    responses: {
      '200': {
        description: 'Branch.Station PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Station, {partial: true}),
        },
      },
    })
    station: Partial<Station>,
    @param.query.object('where', getWhereSchemaFor(Station)) where?: Where<Station>,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  ): Promise<Count> {
    return this.branchRepository.stations(id).patch(station, where);
  }

<<<<<<< HEAD
  @del("/branches/{id}/stations", {
    responses: {
      "200": {
        description: "Branch.Station DELETE success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async delete(
    @param.path.number("id") id: number,
    @param.query.object("where", getWhereSchemaFor(Station))
    where?: Where<Station>
=======
  @del('/branches/{id}/stations', {
    responses: {
      '200': {
        description: 'Branch.Station DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Station)) where?: Where<Station>,
>>>>>>> e5e3a54e249e3d76583c76f5cec0a3289dc70254
  ): Promise<Count> {
    return this.branchRepository.stations(id).delete(where);
  }
}
