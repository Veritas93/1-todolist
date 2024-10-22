import { LoginType } from "./authApi.types"
import { AxiosResponse } from "axios"
import { BaseResponse } from "common/types/commonType"
import { instance } from "common"
import { TaskPriorities, TaskStatuses } from "features/todolist/lib/enums/enums"

export const authApi = {
  login(data: LoginType) {
    return instance.post<BaseResponse<{ userId: number }>, AxiosResponse<BaseResponse<{ userId: number }>>, LoginType>(
      "auth/login",
      data,
    )
  },
  logOut() {
    return instance.delete<BaseResponse>(`auth/login`)
  },
  me() {
    return instance.get<BaseResponse<UserType>>("/auth/me")
  },
}

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

export type UserType = {
  id: number
  email: string
  login: string
}
