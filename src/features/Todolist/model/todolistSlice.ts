import { AxiosError } from "axios"
import { TodolistType, todolistApi } from "features/todolist/api/todolist-api"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { RequestStatusType, setStatus } from "../../../app/model/appSlice"
import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Result_Code } from "features/todolist/lib/enums/enums"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { getTasks } from "features/todolist/task/model/tasksSlice"
import { FilterValues } from "common/types/commonType"
import { thunkTryCatch } from "common/utils/thunkTryCatch"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    ChangeEntityStatusTodolist: (state, action: PayloadAction<{ todoId: string; entityStatus: RequestStatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todoId)
      if (index !== -1) state[index].entityStatus = action.payload.entityStatus
    },
    ChangeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValues }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    ChangeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state[index].title = action.payload.title
    },
    SetTodolist: (state, action: PayloadAction<{ todos: TodolistType[] }>) => {
      //   // 1 var
        return action.payload.todos.map((tl) => ({...tl, filter: "all", entityStatus: "idle"}))
        // 2 var
      // action.payload.todos.forEach((tl) => {
      //   state.push({ ...tl, filter: "all", entityStatus: "idle" })
      // })
    },
    ClearData: (state) => {
      return (state = [])
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeTodo.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.todoId)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
      })
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { ChangeEntityStatusTodolist, ChangeTodolistFilter, ChangeTodolistTitle, SetTodolist, ClearData } =
  todolistsSlice.actions

export const getTodos = createAppAsyncThunk<TodolistType[], void>(
  `${todolistsSlice.name}/getTodos`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const res = await todolistApi.getTodolist()
      dispatch(SetTodolist({ todos: res.data }))
      res.data.forEach((tl) => {
        dispatch(getTasks(tl.id))
      })
      return res.data
    } catch (err) {
      handleServerNetworkError(dispatch, err)
      return rejectWithValue(null)
    }
  },
)

export const removeTodo = createAppAsyncThunk<{ todoId: string }, { todoId: string }>(
  `${todolistsSlice.name}`,
  async (arg, { dispatch, rejectWithValue }) => { 
    // try {
      dispatch(ChangeEntityStatusTodolist({ todoId: arg.todoId, entityStatus: "loading" }))
      const res = await todolistApi.deleteTodolist(arg.todoId).finally(()=>{
        dispatch(ChangeEntityStatusTodolist({ todoId: arg.todoId, entityStatus: "idle" }))
      })
      if (res.data.resultCode === Result_Code.SUCCESS) {
        return { todoId: arg.todoId }
      } else {
        return rejectWithValue(res.data)
      }
  }
)

export const addTodo = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  `${todolistsSlice.name}/addTodo`,
  async (title, {rejectWithValue } ) => {
      const res = await todolistApi.createTodolist(title)
    if (res.data.resultCode === Result_Code.SUCCESS) {
      return { todolist: res.data.data.item }
    } else {
      return rejectWithValue(res.data)
    }
    })

export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
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

export type TodolistDomainType = TodolistType & {
  filter: FilterValues
  entityStatus: RequestStatusType
}
const initialTodolists: Array<TodolistDomainType> = []
