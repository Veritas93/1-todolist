import { useState } from "react"
import { v1 } from "uuid"
import { TaskId1, TaskId2 } from "../../app/lib/id-utils"
import { TodolistDomainType } from "features/todolist/model/todolistSlice"
import { FilterValues } from "common/types/commonType"

export const useTodolist = (onTodolistRemove: (id: string) => void, onTodolistAddTasks: (id: string) => void) => {
  const [todoList, setTodoList] = useState<TodolistDomainType[]>([
    {
      id: TaskId1,
      title: "What to learn",
      filter: "all",
      entityStatus: "idle",
      addedDate: "",
      order: 0,
    },
    {
      id: TaskId2,
      title: "What to do",
      filter: "all",
      entityStatus: "idle",
      addedDate: "",
      order: 0,
    },
  ])

  const addTodolist = (titleTodo: string) => {
    const TaskIdNew = v1()
    const newTodo: TodolistDomainType = {
      id: TaskIdNew,
      title: titleTodo,
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    }
    const nextState: Array<TodolistDomainType> = [...todoList, newTodo]
    setTodoList(nextState)
    onTodolistAddTasks(TaskIdNew)
  }

  const changeFilter = (tasksId: string, NewFilterValue: FilterValues) => {
    setTodoList(todoList.map((el) => (el.id === tasksId ? { ...el, filter: NewFilterValue } : el)))
  }

  const changeTodolistTitle = (tasksId: string, NewTitleValue: string) => {
    setTodoList(todoList.map((el) => (el.id === tasksId ? { ...el, titleTodo: NewTitleValue } : el)))
  }

  const removeTodolist = (taskID: string) => {
    setTodoList(todoList.filter((el) => el.id !== taskID))
    onTodolistRemove(taskID)
  }
  return {
    todoList,
    addTodolist,
    changeFilter,
    changeTodolistTitle,
    removeTodolist,
  }
}
