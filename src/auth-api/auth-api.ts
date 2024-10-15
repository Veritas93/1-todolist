import { LoginType } from "./../features/Login/Login"
import axios, { AxiosInstance, AxiosResponse } from "axios"
import { TaskPriorities, TaskStatuses } from "../state/task/tasksSlice"

const instance: AxiosInstance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1`,
  withCredentials: true,
  headers: {
    "API-KEY": "87554104-bc93-42be-bdbe-8201f181e1db",
  },
})

export const authApi = {
  login(data: LoginType) {
    return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{ userId: number }>>, LoginType>(
      "auth/login",
      data,
    )
  },
  logOut() {
    return instance.delete<ResponseType>(`auth/login`)
  },
  me() {
    return instance.get<ResponseType<UserType>>("/auth/me")
  },
}

// export const todolistApi = {
//   getTodolist() {
//     return instance.get<TodolistType[]>('/todo-lists', {
//       withCredentials: true,
//     });
//   },

//   createTodolist(title: string) {
//     return instance.post<ResponceType<{ item: TodolistType }>>('/todo-lists', {
//       title,
//     });
//   },

//   updateTodolist(idTodolist: string, title: string) {
//     return instance.put<ResponceType>(`/todo-lists/${idTodolist}`, { title });
//   },
//   deleteTodolist(idTodolist: string) {
//     return instance.delete<ResponceType>(`/todo-lists/${idTodolist}`);
//   },
// };

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}

export type ResponseType<T = {}> = {
  data: T
  fieldErrors: string[]
  resultCode: number
  messages: string[]
}

export type UserType = {
  id: number
  email: string
  login: string
}
