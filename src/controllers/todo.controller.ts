import { repository } from '@loopback/repository';
import { TodoRepository } from '../repositories/todo.repository';
import { Todo } from '../models';
import {
  HttpErrors,
  post,
  param,
  requestBody,
  get,
  put,
  patch,
  del
} from '@loopback/rest';

export class TodoController {
  constructor(@repository(TodoRepository) protected todoRepo: TodoRepository) { }

  @post('/todos')
  async createTodo(@requestBody() todo: Todo) {
    if (!todo.title) {
      throw new HttpErrors.BadRequest('title is required');
    }
    return await this.todoRepo.create(todo);
  }

  @get('/todos/{id}')
  async findTodoById(@param.path.number('id') id: number): Promise<Todo> {
    return await this.todoRepo.findById(id);
  }

  @get('/todos')
  async findTodos(): Promise<Todo[]> {
    return await this.todoRepo.find();
  }

  @put('/todos/{id}')
  async replaceTodo(
    @param.path.number('id') id: number,
    @requestBody() todo: Todo
  ): Promise<void> {
    await this.todoRepo.updateById(id, todo);
  }

  @del('/todos/{id}')
  async deleteTodo(@param.path.number('id') id: number): Promise<void> {
    await this.todoRepo.deleteById(id);
  }
}
