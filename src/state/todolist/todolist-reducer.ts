import { AxiosError } from 'axios';
import { TodolistType, todolistApi } from '../../todolists-api/todolist-api';
import {
  handleServerAppError,
  handleServerNetworkError,
} from '../../utils/error-utils';
import {
  RequestStatusType,
  SetAppStatusType,
  setErrorAC,
  setStatusAC,
} from '../app-reducer';
import { AppThunkType } from '../store';
import { Result_Code } from '../task/tasks-reducer';

export const todolistsReducer = (
  todolists: TodolistDomainType[] = initialTodolists,
  action: TodolistActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'SET-TODOLISTS': {
      return action.payload.todos.map((tl) => ({
        ...tl,
        filter: 'all',
        entityStatus: 'idle',
      }));
    }
    case 'ADD-TODOLIST': {
      const newTodolist: TodolistDomainType = {
        ...action.payload.todolist,
        filter: 'all',
        entityStatus: 'idle',
      };
      return [newTodolist, ...todolists];
    }
    case 'REMOVE-TODOLIST': {
      const { id } = action.payload;
      return todolists.filter((el) => el.id !== id);
    }

    case 'CHANGE-TODOLIST-FILTER': {
      const { id, filter } = action.payload;
      return todolists.map((el) =>
        el.id === id ? { ...el, filter: filter } : el
      );
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const { id, title } = action.payload;
      return todolists.map((el) =>
        el.id === id ? { ...el, title: title } : el
      );
    }
    case 'CHANGE-ENTITY-STATUS': {
      return todolists.map((t) =>
        t.id === action.payload.todoId
          ? { ...t, entityStatus: action.payload.entityStatus }
          : t
      );
    }
    default:
      return todolists;
  }
};

export const ChangeEntityStatusTodolistAC = (
  todoId: string,
  entityStatus: RequestStatusType
) =>
  ({
    type: 'CHANGE-ENTITY-STATUS',
    payload: { todoId, entityStatus },
  } as const);
export const AddTodolistAC = (todolist: TodolistType) =>
  ({
    type: 'ADD-TODOLIST',
    payload: { todolist },
  } as const);

export const RemoveTodolistAC = (id: string) =>
  ({
    type: 'REMOVE-TODOLIST',
    payload: { id },
  } as const);

export const ChangeTodolistFilterAC = (id: string, filter: FilterType) =>
  ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: { id, filter },
  } as const);

export const ChangeTodolistTitleAC = (id: string, title: string) =>
  ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: { id, title },
  } as const);

export const SetTodolistAC = (todos: TodolistType[]) =>
  ({ type: 'SET-TODOLISTS', payload: { todos } } as const);

export const getTodosTC = (): AppThunkType => (dispatch) => {
  todolistApi
    .getTodolist()
    .then((res) => {
      dispatch(SetTodolistAC(res.data));
      dispatch(setStatusAC('succeeded'));
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err);
      // dispatch(ChangeEntityStatusTodolistAC(todoId, 'failed'));
    });
};

export const removeTodosTC =
  (todoId: string): AppThunkType =>
  (dispatch) => {
    dispatch(setStatusAC('loading'));
    dispatch(ChangeEntityStatusTodolistAC(todoId, 'loading'));
    todolistApi
      .deleteTodolist(todoId)
      .then((res) => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
          dispatch(RemoveTodolistAC(todoId));
          dispatch(setStatusAC('succeeded'));
        } else {
          handleServerAppError(dispatch, res.data);
        }
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, err);
        dispatch(ChangeEntityStatusTodolistAC(todoId, 'failed'));
      });
  };

export const addTodosTC =
  (title: string): AppThunkType =>
  (dispatch) => {
    dispatch(setStatusAC('loading'));
    todolistApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
          dispatch(AddTodolistAC(res.data.data.item));
          dispatch(setStatusAC('succeeded'));
        } else {
          handleServerAppError(dispatch, res.data);
        }
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, err);
        // dispatch(ChangeEntityStatusTodolistAC(todoId, 'failed'));
      });
  };

export const changeTodolistTitleTC =
  (id: string, title: string): AppThunkType =>
  (dispatch) => {
    dispatch(setStatusAC('loading'));
    todolistApi
      .updateTodolist(id, title)
      .then((res) => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
          dispatch(ChangeTodolistTitleAC(id, title));
          dispatch(setStatusAC('succeeded'));
        } else {
          handleServerAppError(dispatch, res.data);
        }
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, err);
        dispatch(ChangeEntityStatusTodolistAC(id, 'failed'));
      });
  };

export type FilterType = 'all' | 'active' | 'completed';
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>;
export type SetTodolistActionType = ReturnType<typeof SetTodolistAC>;

export type TodolistActionsType =
  | AddTodolistActionType
  | RemoveTodolistActionType
  | ReturnType<typeof ChangeTodolistFilterAC>
  | ReturnType<typeof ChangeTodolistTitleAC>
  | SetTodolistActionType
  | SetAppStatusType
  | ReturnType<typeof ChangeEntityStatusTodolistAC>;

export type TodolistDomainType = TodolistType & {
  filter: FilterType;
  entityStatus: RequestStatusType;
};
const initialTodolists: Array<TodolistDomainType> = [];
