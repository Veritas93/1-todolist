
import { TaskStateType } from "appWithRedux/AppWithRedux"
import { AddTodolist, ClearData, RemoveTodolist, SetTodolist } from "../todolist/todolistSlice"
import { AppRootStateType, AppThunkType } from "../store"
import { UpdateTaskModelType } from "todolists-api/todolist-api"
import { taskApi } from "tasks-api/task-api"
import { setError, setStatus } from "../appSlice"
import { handleServerAppError } from "utils/error-utils"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { action } from "@storybook/addon-actions/*"

const initialState: TaskStateType = {}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TaskStateType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ taskId: string; todoListId: string }>) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    },
    updateTask: (
      state,
      action: PayloadAction<{ taskId: string; model: UpdateDomainTaskModelType; todoListId: string }>,
    ) => {
      let tasks = state[action.payload.todoListId]
      console.log("up", tasks)
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1)  tasks[index] = {...tasks[index], ...action.payload.model }
    },
    setTasks: (state, action: PayloadAction<{ todoId: string; tasks: TaskType[] }>) => {
      state[action.payload.todoId] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(RemoveTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(SetTodolist, (state, action) => {
        action.payload.todos.forEach((tl) => (state[tl.id] = []))
      })
      .addCase(ClearData, (state)=> {
        return state = {}
        console.log("tasks", state)
      })
  },
})

export const tasksReducer = tasksSlice.reducer
export const {removeTask, addTask, updateTask, setTasks} = tasksSlice.actions

export const getTasksTC =
  (todoId: string): AppThunkType =>
  (dispatch) => {
    dispatch(setStatus({ status: "loading" }))
    taskApi
      .getTasks(todoId)
      .then((res) => {
        dispatch(setTasks({todoId: todoId, tasks: res.data.items}))
        dispatch(setStatus({ status: "succeeded" }))
      })
      .catch((err) => {
        dispatch(setError({ error: err.message }))
        dispatch(setStatus({ status: "failed" }))
      })
  }

export const createTaskTC =
  (todoId: string, title: string): AppThunkType =>
  (dispatch) => {
    dispatch(setStatus({ status: "loading" }))
    taskApi
      .createTask(todoId, title)
      .then((res) => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
          dispatch(addTask({task: res.data.data.item}))
          dispatch(setStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err) => {
        dispatch(setError({ error: err.message }))
        dispatch(setStatus({ status: "failed" }))
      })
  }

export const deleteTaskTC =
  (todoId: string, taskId: string): AppThunkType =>
  (dispatch) => {
    dispatch(setStatus({ status: "loading" }))
    taskApi
      .deleteTask(todoId, taskId)
      .then((res) => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
          dispatch(removeTask({taskId: taskId, todoListId: todoId}))
          dispatch(setStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err) => {
        dispatch(setError({ error: err.message }))
        dispatch(setStatus({ status: "failed" }))
      })
  }

export const updateTaskTC =
  (todoId: string, domainModel: UpdateDomainTaskModelType, taskId: string): AppThunkType =>
  (dispatch, getState: () => AppRootStateType) => {
    dispatch(setStatus({ status: "loading" }))
    const state = getState()
    const task = state.tasks[todoId].find((task) => task.id === taskId)
    if (!task) {
      // throw new Error('task not found is the state');
      console.warn("task not found is the state")
      return
    }
    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel,
    }
    taskApi
      .updateTask(todoId, taskId, apiModel)
      .then((res:any) => {
        console.log(res)
        if (res.data.resultCode === Result_Code.SUCCESS) {
          dispatch(updateTask({taskId, model: domainModel, todoListId: todoId}))
          dispatch(setStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((err) => {
        dispatch(setError({ error: err.message }))
        dispatch(setStatus({ status: "failed" }))
      })
  }

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
  description: string
  title: string
  completed: boolean
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
