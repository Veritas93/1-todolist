import { v1 } from "uuid"
import { TaskStateType } from "../../../../app/appWithRedux/AppWithRedux"
import { tasksReducer } from "./tasksSlice"
import { TodolistDomainType, addTodo, todolistsReducer } from "../../model/todolistSlice"
import { TestAction } from "common/types/commonType"

test("ids should be equals", () => {
  const startTasksState: TaskStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action: TestAction<typeof addTodo.fulfilled> = {
    type: addTodo.fulfilled.type,
    payload: {
      todolist: {
        id: v1(),
        addedDate: "",
        order: 0,
        title: "titleTodo",
      },
    },
  }

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
