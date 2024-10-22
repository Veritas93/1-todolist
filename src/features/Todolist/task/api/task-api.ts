import { BaseResponse, TaskType, UpdateDomainTaskModelType } from "../../../../common/types/commonType"
import { AxiosResponse } from "axios"
import { instance } from "common"

export const taskApi = {
  getTasks(todoId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todoId}/tasks`, {
      // withCredentials: true,
    })
  },

  createTask(arg: AddTaskArgs) {
    const { todoId, title } = arg
    return instance.post<
      BaseResponse<{ item: TaskType }>,
      AxiosResponse<BaseResponse<{ item: TaskType }>>,
      { title: string }
    >(`/todo-lists/${todoId}/tasks`, { title })
  },

  updateTask(idTodolist: string, taskId: string, model: UpdateDomainTaskModelType) {
    return instance.put<BaseResponse<TaskType>>(`todo-lists/${idTodolist}/tasks/${taskId}`, model)
  },

  deleteTask(idTodolist: string, taskId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${idTodolist}/tasks/${taskId}`)
  },
}

export type UpdateTaskArg = {
  todoId: string
  domainModel: UpdateDomainTaskModelType
  taskId: string
}

export type AddTaskArgs = {
  todoId: string
  title: string
}

type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export type DeleteTaskArg = {
  todoId: string
  taskId: string
}
