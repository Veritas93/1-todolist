import { TaskStateType } from '../../appWithRedux/AppWithRedux';
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from '../todolist/todolist-reducer';
import { AppRootStateType, AppThunkType } from '../store';
import { UpdateTaskModelType } from '../../todolists-api/todolist-api';
import { taskApi } from '../../tasks-api/task-api';
import { SetTodolistActionType } from '../todolist/todolist-reducer';
import { SetAppStatusType, setErrorAC, setStatusAC } from '../app-reducer';
import { handleServerAppError } from '../../utils/error-utils';

const initialState: TaskStateType = {};

export const tasksReducer = (
  tasks: TaskStateType = initialState,
  action: TasksActionsType
): TaskStateType => {
  switch (action.type) {
    case 'SET-TODOLISTS': {
      return action.payload.todos.reduce((acc, tl) => {
        acc[tl.id] = [];
        return acc;
      }, tasks);
    }
    case 'SET-TASKS': {
      return {
        ...tasks,
        [action.payload.todoId]: action.payload.tasks,
      };
    }
    case 'REMOVE-TASK': {
      const taskID = action.payload.todoListId;
      const id = action.payload.taskId;
      return { ...tasks, [taskID]: tasks[taskID].filter((t) => t.id !== id) };
    }
    case 'CREATE-TASK': {
      const todoId = action.payload.task.todoListId;
      return {
        ...tasks,
        [todoId]: [action.payload.task, ...tasks[todoId]],
      };
    }
    //
    case 'UPDATE-TASK': {
      let todolistTasks = tasks[action.payload.todoListId];
      let newTaskArray = todolistTasks.map((t) =>
        t.id === action.payload.taskId ? { ...t, ...action.payload.model } : t
      );
      tasks[action.payload.todoListId] = newTaskArray;
      return { ...tasks };
    }
    case 'ADD-TODOLIST': {
      return { ...tasks, [action.payload.todolist.id]: [] };
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

export const removeTaskAC = (taskId: string, todoListId: string) =>
  ({
    type: 'REMOVE-TASK',
    payload: { taskId, todoListId },
  } as const);

export const createTaskAC = (task: TaskType) =>
  ({
    type: 'CREATE-TASK',
    payload: { task },
  } as const);

export const updateTaskAC = (
  taskId: string,
  model: UpdateDomainTaskModelType,
  todoListId: string
) =>
  ({
    type: 'UPDATE-TASK',
    payload: { taskId, model, todoListId },
  } as const);

const setTasksAC = (todoId: string, tasks: TaskType[]) =>
  ({
    type: 'SET-TASKS',
    payload: { todoId, tasks },
  } as const);

export const getTasksTC =
  (todoId: string): AppThunkType =>
  (dispatch) => {
    dispatch(setStatusAC('loading'));
    taskApi
      .getTasks(todoId)
      .then((res) => {
        dispatch(setTasksAC(todoId, res.data.items));
        dispatch(setStatusAC('succeeded'));
      })
      .catch((err) => {
        dispatch(setErrorAC(err.message));
        dispatch(setStatusAC('failed'));
      });
  };

export const createTaskTC =
  (todoId: string, title: string): AppThunkType =>
  (dispatch) => {
    dispatch(setStatusAC('loading'));
    taskApi
      .createTask(todoId, title)
      .then((res) => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
          dispatch(createTaskAC(res.data.data.item));
          dispatch(setStatusAC('succeeded'));
        } else {
          handleServerAppError(dispatch, res.data);
        }
      })
      .catch((err) => {
        dispatch(setErrorAC(err.message));
        dispatch(setStatusAC('failed'));
      });
  };

export const deleteTaskTC =
  (todoId: string, taskId: string): AppThunkType =>
  (dispatch) => {
    dispatch(setStatusAC('loading'));
    taskApi
      .deleteTask(todoId, taskId)
      .then((res) => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
          dispatch(removeTaskAC(taskId, todoId));
          dispatch(setStatusAC('succeeded'));
        } else {
          handleServerAppError(dispatch, res.data);
        }
      })
      .catch((err) => {
        dispatch(setErrorAC(err.message));
        dispatch(setStatusAC('failed'));
      });
  };

export const updateTaskTC =
  (
    todoId: string,
    domainModel: UpdateDomainTaskModelType,
    taskId: string
  ): AppThunkType =>
  (dispatch, getState: () => AppRootStateType) => {
    dispatch(setStatusAC('loading'));
    const state = getState();
    const task = state.tasks[todoId].find((task) => task.id === taskId);
    if (!task) {
      // throw new Error('task not found is the state');
      console.warn('task not found is the state');
      return;
    }
    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel,
    };
    taskApi
      .updateTask(todoId, taskId, domainModel)
      .then((res) => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
          dispatch(updateTaskAC(taskId, apiModel, todoId));
          dispatch(setStatusAC('succeeded'));
        } else {
          handleServerAppError(dispatch, res.data);
        }
      })
      .catch((err) => {
        dispatch(setErrorAC(err.message));
        dispatch(setStatusAC('failed'));
      });
  };

// Type
export enum Result_Code {
  SUCCESS = 0,
  ERROR = 1,
  RECAPTCHA_ERROR = 10,
}
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof createTaskAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | ReturnType<typeof updateTaskAC>
  | SetTodolistActionType
  | ReturnType<typeof setTasksAC>
  | SetAppStatusType;
