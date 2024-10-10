import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  TodolistDomainType,
  todolistsReducer,
} from './todolist-reducer';
import { v1 } from 'uuid';
let todolistId1: string;
let todolistId2: string;

let startState: Array<TodolistDomainType>;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    {
      id: todolistId1,
      title: 'What to learn',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
    {
      id: todolistId2,
      title: 'What to buy',
      filter: 'all',
      entityStatus: 'idle',
      addedDate: '',
      order: 0,
    },
  ];
});

test('correct todolist should be removed', () => {
  // 1. Стартовый state

  // 2. Действие
  const action = RemoveTodolistAC(todolistId1);

  const endState = todolistsReducer(startState, action);

  // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
  // в массиве останется один тудулист
  expect(endState.length).toBe(1);
  // удалится нужный тудулист, а не любой
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const action = AddTodolistAC({
    id: v1(),
    addedDate: '',
    order: 0,
    title: 'dfg',
  });

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(action.payload.todolist.title);
});

test('correct todolist should change its name', () => {
  const action = ChangeTodolistTitleAC(todolistId2, 'New Todolist');

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(action.payload.title);
});

test('correct filter of todolist should be changed', () => {
  const action = ChangeTodolistFilterAC(todolistId2, 'completed');

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(action.payload.filter);
});
