import { TaskPriorities, TaskStatuses } from "features/todolist/lib/enums/enums"


export type TestAction<T extends (...arg: any) => any> = Omit<ReturnType<T>, "meta">
export type BaseResponse<T = {}> = {
  data: T
  fieldErrors: string[]
  resultCode: number
  messages: string[]
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

export type FilterType = "all" | "active" | "completed"
