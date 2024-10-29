import { TaskStateType } from "app/appWithRedux/AppWithRedux"
import { ClearData, SetTodolist, addTodo, removeTodo } from "../../model/todolistSlice"

import { AddTaskArgs, DeleteTaskArg, UpdateTaskArg, taskApi } from "features/todolist/task/api/task-api"
import { setStatus } from "app/model/appSlice"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { Result_Code } from "features/todolist/lib/enums/enums"
import { TaskType, UpdateTaskModelType } from "common/types/commonType"
import { thunkTryCatch } from "common/utils/thunkTryCatch"

const initialState: TaskStateType = {}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TaskStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state[action.payload.todoId] = action.payload.tasks
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        let tasks = state[action.payload.todoId]
        console.log("up", tasks)
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.domainModel }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoId]
        const index = tasks.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          tasks.splice(index, 1)
        }
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        delete state[action.payload.todoId]
      })
      .addCase(SetTodolist, (state, action) => {
        action.payload.todos.forEach((tl) => (state[tl.id] = []))
      })
      .addCase(ClearData, (state) => {
        return (state = {})
      })
  },
  selectors: {
    selectTasks: (sliceState) => sliceState,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors

export const getTasks = createAppAsyncThunk<{ tasks: TaskType[]; todoId: string }, string>(
  `${tasksSlice.name}/getTasks`,
  async (todoId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setStatus({ status: "loading" }))
      const res = await taskApi.getTasks(todoId)
      dispatch(setStatus({ status: "succeeded" }))
      return { todoId, tasks: res.data.items }
    } catch (err) {
      handleServerNetworkError(dispatch, err)
      return rejectWithValue(null)
    }
  },
)
export const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgs>(
  `${tasksSlice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async ()=> {
      const res = await taskApi.createTask(arg)
      if (res.data.resultCode === Result_Code.SUCCESS) {
        return { task: res.data.data.item }
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
    } 
    }) 
  },
)


export const updateTask = createAppAsyncThunk<UpdateTaskArg, UpdateTaskArg>(
  `${tasksSlice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI
    try {
      dispatch(setStatus({ status: "loading" }))
      const state = getState()
      const task = state.tasks[arg.todoId].find((task) => task.id === arg.taskId)
      if (!task) {
        // throw new Error('task not found is the state');
        console.warn("task not found is the state")
        return rejectWithValue(null)
      }
      const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...arg.domainModel,
      }

      const res = await taskApi.updateTask(arg.todoId, arg.taskId, apiModel)
      if (res.data.resultCode === Result_Code.SUCCESS) {
        dispatch(setStatus({ status: "succeeded" }))
        return arg
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
      }
    } catch (err) {
      handleServerNetworkError(dispatch, err)
      return rejectWithValue(null)
    }
  },
)

export const deleteTask = createAppAsyncThunk<DeleteTaskArg, DeleteTaskArg>(
  `${tasksSlice.name}/deleteTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    console.log(arg)
    try {
      dispatch(setStatus({ status: "loading" }))
      const res = await taskApi.deleteTask(arg.todoId, arg.taskId)
      if (res.data.resultCode === Result_Code.SUCCESS) {
        dispatch(setStatus({ status: "succeeded" }))
        return { taskId: arg.taskId, todoId: arg.todoId }
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
      }
    } catch (err) {
      handleServerNetworkError(dispatch, err)
      return rejectWithValue(null)
    }
  },
)
