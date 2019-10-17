import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from "@loopback/repository";
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from "@loopback/rest";
import { Branch, Reservation } from "../models";
import { BranchRepository } from "../repositories";

export class BranchReservationController {
  constructor(
    @repository(BranchRepository) protected branchRepository: BranchRepository
  ) {}

  @get("/branches/{id}/reservations", {
    responses: {
      "200": {
        description: "Array of Reservation's belonging to Branch",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(Reservation) }
          }
        }
      }
    }
  })
  async find(
    @param.path.number("id") id: number,
    @param.query.object("filter") filter?: Filter<Reservation>
  ): Promise<Reservation[]> {
    return this.branchRepository.reservations(id).find(filter);
  }

  @post("/branches/{id}/reservations", {
    responses: {
      "200": {
        description: "Branch model instance",
        content: {
          "application/json": { schema: getModelSchemaRef(Reservation) }
        }
      }
    }
  })
  async create(
    @param.path.number("id") id: typeof Branch.prototype.id,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Reservation, {
            exclude: ["id"],
            optional: ["branchId"]
          })
        }
      }
    })
    reservation: Omit<Reservation, "id">
  ): Promise<Reservation> {
    return this.branchRepository.reservations(id).create(reservation);
  }

  @patch("/branches/{id}/reservations", {
    responses: {
      "200": {
        description: "Branch.Reservation PATCH success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async patch(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Reservation, { partial: true })
        }
      }
    })
    reservation: Partial<Reservation>,
    @param.query.object("where", getWhereSchemaFor(Reservation))
    where?: Where<Reservation>
  ): Promise<Count> {
    return this.branchRepository.reservations(id).patch(reservation, where);
  }

  @del("/branches/{id}/reservations", {
    responses: {
      "200": {
        description: "Branch.Reservation DELETE success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async delete(
    @param.path.number("id") id: number,
    @param.query.object("where", getWhereSchemaFor(Reservation))
    where?: Where<Reservation>
  ): Promise<Count> {
    return this.branchRepository.reservations(id).delete(where);
  }
}
