import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from 'redux';
import { TasksActionsType, tasksReducer } from './task/tasks-reducer';
import {
  TodolistActionsType,
  todolistsReducer,
} from './todolist/todolist-reducer';
import { ThunkDispatch, thunk, ThunkAction } from 'redux-thunk';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { SetAppErrorType, appReducer } from './app-reducer';
import { authReducer } from './auth/auth-reducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  tasks: tasksReducer,
  todolists: todolistsReducer,
});
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppDispatchType = ThunkDispatch<
  AppRootStateType,
  unknown,
  AnyAction
>;

export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

export type AppActionsType =
  | TasksActionsType
  | TodolistActionsType
  | SetAppErrorType;

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
