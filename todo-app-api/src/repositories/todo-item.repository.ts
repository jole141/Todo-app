import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {TodoItem, TodoItemRelations} from '../models';

export class TodoItemRepository extends DefaultCrudRepository<
  TodoItem,
  typeof TodoItem.prototype.id,
  TodoItemRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(TodoItem, dataSource);
  }
}
