import { v1 } from 'uuid';
import { TaskStateType } from '../../appWithRedux/AppWithRedux';
import {
  TaskPriorities,
  TaskStatuses,
  createTaskAC,
  updateTaskAC,
  removeTaskAC,
  tasksReducer,
} from './tasks-reducer';
import { AddTodolistAC, RemoveTodolistAC } from '../todolist/todolist-reducer';

let startState: TaskStateType;

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'HTML&CSS',
        description: '',
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'JS',
        description: '',
        completed: false,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'REDUX',
        description: '',
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        description: '',
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'milk',
        description: '',
        completed: false,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'tea',
        description: '',
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
      },
    ],
  };
});

test('correct task should be deleted from correct array', () => {
  const action = removeTaskAC('2', 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '3', title: 'tea', isDone: false },
    ],
  });
});

test('correct task should be added to correct array', () => {
  const task = {
    description: '',
    title: 'NewTASK',
    completed: false,
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: '',
    deadline: '',
    id: '',
    todoListId: '',
    order: 0,
    addedDate: '',
  };

  const action = createTaskAC(task);

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].id).toBeDefined();
  expect(endState['todolistId2'][0].title).toBe('NewTASK');
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {
  const action = updateTaskAC('2', { status: TaskStatuses.New }, 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {
  const action = updateTaskAC('2', { title: 'eggs' }, 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'][1].title).toBe('JS');
  expect(endState['todolistId2'][1].title).toBe('eggs');
});

test('new array should be added when new todolist is added', () => {
  const startState: TaskStateType = {
    todolistId1: [
      {
        id: '1',
        title: 'HTML&CSS',
        description: '',
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'JS',
        description: '',
        completed: false,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'REDUX',
        description: '',
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId1',
        order: 0,
        addedDate: '',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        description: '',
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'milk',
        description: '',
        completed: false,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'tea',
        description: '',
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: '',
      },
    ],
  };

  const action = AddTodolistAC({
    id: v1(),
    addedDate: '',
    order: 0,
    title: 'cscsdcsd',
  });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2');
  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
  const action = RemoveTodolistAC('todolistId2');

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).toBeUndefined();
});
