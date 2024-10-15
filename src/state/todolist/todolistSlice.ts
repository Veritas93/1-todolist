import { action } from '@storybook/addon-actions';
import { AxiosError } from "axios"
import { TodolistType, todolistApi } from "todolists-api/todolist-api"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { RequestStatusType, setStatus } from "../appSlice"
import { AppThunkType } from "../store"
import { Result_Code, getTasksTC } from "../task/tasksSlice"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    ChangeEntityStatusTodolist: (state, action: PayloadAction<{ todoId: string; entityStatus: RequestStatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todoId)
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus
    },
    AddTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    },
    RemoveTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
    },
    ChangeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    ChangeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].title = action.payload.title
    },
    SetTodolist: (state, action: PayloadAction<{ todos: TodolistType[] }>) => {
      // 1 var
      // return action.payload.todos.map((tl) => ({...tl, filter: "all", entityStatus: "idle"}))
      // 2 var
      action.payload.todos.forEach((tl) => {
        state.push({ ...tl, filter: "all", entityStatus: "idle" })
      })
    },
    ClearData: (state)=>{

      return state = []
      console.log("todolists", state)
    }
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const {
  ChangeEntityStatusTodolist,
  AddTodolist,
  RemoveTodolist,
  ChangeTodolistFilter,
  ChangeTodolistTitle,
  SetTodolist,
  ClearData,
} = todolistsSlice.actions

export const getTodosTC = (): AppThunkType => (dispatch) => {
  todolistApi
    .getTodolist()
    .then((res) => {
      dispatch(SetTodolist({ todos: res.data }))
      dispatch(setStatus({ status: "succeeded" }))
      return res.data
    })
    .then((todos)=>{
        todos.forEach((tl)=> {
          dispatch(getTasksTC(tl.id))
        })  
    })
    .catch((err: AxiosError) => {
      handleServerNetworkError(dispatch, err)
    })
}

export const removeTodosTC =
  (todoId: string): AppThunkType =>
  (dispatch) => {
    dispatch(setStatus({ status: "loading" }))
    dispatch(ChangeEntityStatusTodolist({ todoId, entityStatus: "loading" }))
    todolistApi
      .deleteTodolist(todoId)
      .then((res) => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
          dispatch(RemoveTodolist({ id: todoId }))
          dispatch(setStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, err)
        dispatch(ChangeEntityStatusTodolist({ todoId, entityStatus: "failed" }))
      })
  }

export const addTodosTC =
  (title: string): AppThunkType =>
  (dispatch) => {
    dispatch(setStatus({ status: "loading" }))
    todolistApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
          dispatch(AddTodolist({ todolist: res.data.data.item }))
          dispatch(setStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, err)
        // dispatch(ChangeEntityStatusTodolistAC(todoId, 'failed'));
      })
  }

export const changeTodolistTitleTC =
  (id: string, title: string): AppThunkType =>
  (dispatch) => {
    dispatch(setStatus({ status: "loading" }))
    todolistApi
      .updateTodolist(id, title)
      .then((res) => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
          dispatch(ChangeTodolistTitle({ id, title }))
          dispatch(setStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(dispatch, err)
        dispatch(ChangeEntityStatusTodolist({ todoId: id, entityStatus: "failed" }))
      })
  }

export type FilterType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterType
  entityStatus: RequestStatusType
}
const initialTodolists: Array<TodolistDomainType> = []
