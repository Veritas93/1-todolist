import { BaseResponse, Task, UpdateDomainTaskModel } from "../../../../common/types/commonType"
import { AxiosResponse } from "axios"
import { instance } from "common"
import { GetTasksResponse, AddTaskArgs } from "./taskApi.types"

export const taskApi = {
  getTasks(todoId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todoId}/tasks`, {
      // withCredentials: true,
    })
  },

  createTask(arg: AddTaskArgs) {
    const { todoId, title } = arg
    return instance.post<
      BaseResponse<{ item: Task }>,
      AxiosResponse<BaseResponse<{ item: Task }>>,
      { title: string }
    >(`/todo-lists/${todoId}/tasks`, { title })
  },

  updateTask(idTodolist: string, taskId: string, model: UpdateDomainTaskModel) {
    return instance.put<BaseResponse<Task>>(`todo-lists/${idTodolist}/tasks/${taskId}`, model)
  },

  deleteTask(idTodolist: string, taskId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${idTodolist}/tasks/${taskId}`)
  },
}


