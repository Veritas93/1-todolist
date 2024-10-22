import { AnyAction } from "redux"
import { tasksReducer } from "../../features/todolist/task/model/tasksSlice"
import { todolistsReducer } from "../../features/todolist/model/todolistSlice"
import { ThunkDispatch, ThunkAction } from "redux-thunk"
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux"
import { appReducer } from "./appSlice"
import { authReducer } from "../../features/auth/model/authSlice"
import { UnknownAction, configureStore } from "@reduxjs/toolkit"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

// непосредственно создаём store
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer,
  },
})
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
// export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// export type AppActionsType = TasksActionsType | TodolistActionsType | SetAppErrorType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
