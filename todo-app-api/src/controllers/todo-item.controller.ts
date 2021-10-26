import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {
  repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, post, put, requestBody,
  response
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {TodoItem} from '../models';
import {TodoItemRepository} from '../repositories';
import {TodoItemDto} from './types';

@authenticate('jwt')
export class TodoItemController {
  constructor(
    @repository(TodoItemRepository)
    public todoItemRepository: TodoItemRepository,
  ) { }

  @post('/todo-items')
  @response(200, {
    description: 'TodoItem model instance',
    content: {'application/json': {schema: getModelSchemaRef(TodoItem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TodoItem, {
            title: 'NewTodoItem',
            exclude: ['id'],
          }),
        },
      },
    })
    todoItemDto: TodoItemDto,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<TodoItem> {
    const todoItem = new TodoItem({
      title: todoItemDto.title,
      isDone: false,
      dom: new Date().toString(),
      userId: currentUserProfile[securityId]
    })
    return this.todoItemRepository.create(todoItem);
  }

  @get('/todo-items')
  @response(200, {
    description: 'Array of TodoItem model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TodoItem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<TodoItem[]> {
    return this.todoItemRepository.find({where: {userId: currentUserProfile[securityId]}});
  }

  @get('/todo-items/{id}')
  @response(200, {
    description: 'TodoItem model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TodoItem, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<TodoItem | null> {
    const filter = {where: {userId: currentUserProfile[securityId], id}}
    const optionalItem = await this.todoItemRepository.findOne(filter)
    return optionalItem ? optionalItem : null;
  }

  @put('/todo-items/{id}')
  @response(204, {
    description: 'TodoItem PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() todoItemDto: TodoItemDto,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<void> {
    const filter = {where: {userId: currentUserProfile[securityId], id}}
    const optionalItem = await this.todoItemRepository.findOne(filter)
    if (optionalItem) {
      optionalItem.title = todoItemDto.title;
      await this.todoItemRepository.replaceById(id, optionalItem);
    }
  }

  @put('/todo-items/check/{id}')
  @response(204, {
    description: 'TodoItem PUT success',
  })
  async checkItemById(
    @param.path.string('id') id: string,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<void> {
    const filter = {where: {userId: currentUserProfile[securityId], id}}
    const optionalItem = await this.todoItemRepository.findOne(filter)
    if (optionalItem) {
      optionalItem.isDone = !optionalItem.isDone;
      await this.todoItemRepository.replaceById(id, optionalItem);
    }
  }

  @del('/todo-items/{id}')
  @response(204, {
    description: 'TodoItem DELETE success',
  })
  async deleteById(@param.path.string('id') id: string,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile): Promise<void> {
    const filter = {where: {userId: currentUserProfile[securityId], id}}
    const optionalItem = await this.todoItemRepository.findOne(filter)
    if (optionalItem) {
      await this.todoItemRepository.delete(optionalItem);
    }
  }
}
