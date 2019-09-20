import {
  Filter,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Employee} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository : EmployeeRepository,
  ) {}

  @post('/employees', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employee)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {exclude: ['id']}),
        },
      },
    })
    employee: Omit<Employee, 'id'>,
  ): Promise<Employee> {
    return this.employeeRepository.create(employee);
  }

  @get('/employees', {
    responses: {
      '200': {
        description: 'Array of Employee model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Employee)) filter?: Filter<Employee>,
  ): Promise<Employee[]> {
    return this.employeeRepository.find(filter);
  }

  @get('/employees/{id}', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employee)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Employee> {
    return this.employeeRepository.findById(id);
  }

  @patch('/employees/{id}', {
    responses: {
      '204': {
        description: 'Employee PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employee, {partial: true}),
        },
      },
    })
    employee: Employee,
  ): Promise<void> {
    await this.employeeRepository.updateById(id, employee);
  }

  @del('/employees/{id}', {
    responses: {
      '204': {
        description: 'Employee DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.employeeRepository.deleteById(id);
  }
}
