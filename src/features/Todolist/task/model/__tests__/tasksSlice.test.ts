import { v1 } from "uuid"
import { TaskStateType } from "app/appWithRedux/AppWithRedux"
import { addTask, updateTask, deleteTask, tasksReducer, getTasks } from "../tasksSlice"
import { addTodo, removeTodo } from "../../../model/todolistSlice"
import { TestAction } from "common/types/commonType"
import { TaskPriorities, TaskStatuses } from "features/todolist/lib/enums/enums"

let startState: TaskStateType

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "HTML&CSS",
        description: "",
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "JS",
        description: "",
        completed: false,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "REDUX",
        description: "",
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        description: "",
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "milk",
        description: "",
        completed: false,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "tea",
        description: "",
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const action: TestAction<typeof deleteTask.fulfilled> = {
    type: deleteTask.fulfilled.type,
    payload: { taskId: "2", todoId: "todolistId2" },
  }

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "HTML&CSS",
        description: "",
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "JS",
        description: "",
        completed: false,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "REDUX",
        description: "",
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        description: "",
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "tea",
        description: "",
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
    ],
  })
})

test("correct task should be added to correct array", () => {
  const task = {
    description: "",
    title: "NewTASK",
    completed: false,
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: "",
    deadline: "",
    id: "",
    todoListId: "todolistId2",
    order: 0,
    addedDate: "",
  }

  const action: TestAction<typeof addTask.fulfilled> = {
    type: addTask.fulfilled.type,
    payload: { task },
  }
  // const action: any= addTask.fulfilled({ todoId: task.todoListId, title: task.title },)

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("NewTASK")
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)
})

test("status of specified task should be changed", () => {
  const action: TestAction<typeof updateTask.fulfilled> = {
    type: updateTask.fulfilled.type,
    payload: { taskId: "2", domainModel: { status: TaskStatuses.New }, todoId: "todolistId2" },
  }

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New)
})

test("title of specified task should be changed", () => {
  const action: TestAction<typeof updateTask.fulfilled> = {
    type: updateTask.fulfilled.type,
    payload: { taskId: "2", domainModel: { title: "eggs" }, todoId: "todolistId2" },
  }

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"][1].title).toBe("JS")
  expect(endState["todolistId2"][1].title).toBe("eggs")
})

test("new array should be added when new todolist is added", () => {
  const startState: TaskStateType = {
    todolistId1: [
      {
        id: "1",
        title: "HTML&CSS",
        description: "",
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "JS",
        description: "",
        completed: false,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "REDUX",
        description: "",
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId1",
        order: 0,
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        description: "",
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "milk",
        description: "",
        completed: false,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "tea",
        description: "",
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId2",
        order: 0,
        addedDate: "",
      },
    ],
  }

  const action: TestAction<typeof addTodo.fulfilled> = {
    type: addTodo.fulfilled.type,
    payload: {
      todolist: {
        id: v1(),
        addedDate: "",
        order: 0,
        title: "cscsdcsd",
      },
    },
  }

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const action: TestAction<typeof removeTodo.fulfilled> = {
    type: removeTodo.fulfilled.type,
    payload: { todoId: "todolistId2" },
  }

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).toBeUndefined()
})

test("tasks should be added for todolist", () => {
  const action: TestAction<typeof getTasks.fulfilled> = {
    type: getTasks.fulfilled.type,
    payload: { tasks: startState["todolistId1"], todoId: "todolistId1" },
  }

  const endState = tasksReducer(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action,
  )
  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(0)
})
