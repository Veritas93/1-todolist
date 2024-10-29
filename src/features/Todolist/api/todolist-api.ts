import { TaskPriorities, TaskStatuses } from "features/todolist/lib/enums/enums"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types/commonType"

export const todolistApi = {
  getTodolist() {
    return instance.get<TodolistType[]>("/todo-lists", {
      withCredentials: true,
    })
  },

  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: TodolistType }>>("/todo-lists", {
      title,
    })
  },

  updateTodolist(idTodolist: string, title: string) {
    return instance.put<BaseResponse>(`/todo-lists/${idTodolist}`, { title })
  },
  deleteTodolist(idTodolist: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${idTodolist}`)
  },
}

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}


