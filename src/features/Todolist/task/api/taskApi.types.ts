import { Task, UpdateDomainTaskModel } from "common/types/commonType"

export type UpdateTaskArg = {
    todoId: string
    domainModel: UpdateDomainTaskModel
    taskId: string
  }
  
  export type AddTaskArgs = {
    todoId: string
    title: string
  }
  
  export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Task[]
  }
  
  export type DeleteTaskArg = {
    todoId: string
    taskId: string
  }