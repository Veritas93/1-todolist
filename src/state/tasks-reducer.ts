import { TaskType } from '../App';
import { v1 } from 'uuid';
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from './todolist-reducer';

import { TaskStateType } from '../App';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

export type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | changeTaskStatusActionType
  | changeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;


const initialState: TaskStateType = {}

export const tasksReducer = (
  tasks = initialState,
  action: ActionsType
): TaskStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const taskID = action.payload.todoListId;
      const id = action.payload.taskId;
      return { ...tasks, [taskID]: tasks[taskID].filter((t) => t.id !== id) };
    }
    case 'ADD-TASK': {
      const taskID = action.payload.todoListId;
      const newTask: TaskType = {
        id: v1(),
        title: action.payload.title,
        isDone: false,
      };
      return { ...tasks, [taskID]: [newTask, ...tasks[taskID]] };
    }
    case 'CHANGE-STATUS-TASK': {
      const taskID = action.payload.todoListId;
      const id = action.payload.taskId;
      const status = action.payload.status;
      return {
        ...tasks,
        [taskID]: tasks[taskID].map((t) =>
          t.id === id ? { ...t, isDone: status } : t
        ),
      };
    }
    case 'CHANGE-TITLE-TASK': {
      const taskID = action.payload.todoListId;
      const id = action.payload.taskId;
      const title = action.payload.title;
      return {
        ...tasks,
        [taskID]: tasks[taskID].map((t) =>
          t.id === id ? { ...t, title: title } : t
        ),
      };
    }
    case 'ADD-TODOLIST': {
      return { ...tasks, [action.payload.id]: [] };
    }
    case 'REMOVE-TODOLIST': {
      let copyTasks = { ...tasks };
      delete copyTasks[action.payload.id];
      return copyTasks;
    }
    default:
      return tasks;
  }
};

export const removeTaskAC = (taskId: string, todoListId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: { taskId, todoListId },
  } as const;
};

export const addTaskAC = (title: string, todoListId: string) => {
  return {
    type: 'ADD-TASK',
    payload: { title, todoListId },
  } as const;
};

export const changeTaskStatusAC = (
  taskId: string,
  status: boolean,
  todoListId: string
) => {
  return {
    type: 'CHANGE-STATUS-TASK',
    payload: { taskId, status, todoListId },
  } as const;
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todoListId: string
) => {
  return {
    type: 'CHANGE-TITLE-TASK',
    payload: { taskId, title, todoListId },
  } as const;
};
