import { UpdateDomainTaskModelType } from "../state/task/tasksSlice"
import axios, { AxiosInstance, AxiosResponse } from "axios"

const instance: AxiosInstance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1`,
  withCredentials: true,
  headers: {
    "API-KEY": "87554104-bc93-42be-bdbe-8201f181e1db",
  },
})
export const taskApi = {
  getTasks(todoId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todoId}/tasks`, {
      // withCredentials: true,
    })
  },

  createTask(todoId: string, title: string) {
    return instance.post<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      { title: string }
    >(`/todo-lists/${todoId}/tasks`, { title })
  },

  updateTask(idTodolist: string, taskId: string, model: UpdateDomainTaskModelType) {
    return instance.put<ResponseType<TaskType>>(`todo-lists/${idTodolist}/tasks/${taskId}`, model )
  },

  deleteTask(idTodolist: string, taskId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${idTodolist}/tasks/${taskId}`)
  },
}

type TaskType = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}
type ResponseType<T = {}> = {
  data: T
  fieldErrors: string[]
  resultCode: number
  messages: string[]
}
