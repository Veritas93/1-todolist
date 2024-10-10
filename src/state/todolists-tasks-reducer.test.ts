import { v1 } from 'uuid';
import { TaskStateType } from './../appWithRedux/AppWithRedux';
import { tasksReducer } from './task/tasks-reducer';
import {
  AddTodolistAC,
  TodolistDomainType,
  todolistsReducer,
} from './todolist/todolist-reducer';

test('ids should be equals', () => {
  const startTasksState: TaskStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  const action = AddTodolistAC({
    id: v1(),
    addedDate: '',
    order: 0,
    title: 'titleTodo',
  });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
