import {User} from '@loopback/authentication-jwt';
import {belongsTo, Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class TodoItem extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'boolean',
  })
  isDone: boolean;

  @property({
    type: 'date',
  })
  dom: string;

  @belongsTo(() => User)
  userId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TodoItem>) {
    super(data);
  }
}

export interface TodoItemRelations {
  // describe navigational properties here
}

export type TodoItemWithRelations = TodoItem & TodoItemRelations;
