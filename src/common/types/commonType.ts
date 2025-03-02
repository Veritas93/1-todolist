
import { TaskPriorities, TaskStatuses } from "features/todolist/lib/enums/enums"


export type TestAction<T extends (...arg: any) => any> = Omit<ReturnType<T>, "meta">
export type BaseResponse<T = {}> = {
  data: T
  fieldsErrors: {field: string, error: string}[]
  resultCode: number
  messages: string[]
}

export type Task = {
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

export type UpdateDomainTaskModel = Partial<UpdateTaskModel>
export type UpdateTaskModel = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}
export type FilterValues = "all" | "active" | "completed"
