import { useState } from "react"
import { v1 } from "uuid"
import { TaskId1, TaskId2 } from "../id-utils"
import { TaskStateType } from "../App"
import { TaskPriorities, TaskStatuses, TaskType } from "../../state/task/tasksSlice"

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskStateType>({
    [TaskId1]: [
      {
        id: v1(),
        title: "HTML&CSS",
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
        id: v1(),
        title: "HTML&CSS",
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
    ],
    [TaskId2]: [
      {
        id: v1(),
        title: "HTML&CSS",
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
        id: v1(),
        title: "HTML&CSS",
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
    ],
  })
  const addTask = (task: TaskType) => {
    const newTask: TaskType = {
      id: v1(),
      title: task.title,
      status: TaskStatuses.New,
      description: "",
      completed: false,
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      todoListId: "todolistId1",
      order: 0,
      addedDate: "",
    }
    setTasks({
      ...tasks,
      [task.todoListId]: [newTask, ...tasks[task.todoListId]],
    })
  }

  const changeTasksStatus = (taskID: string, id: string, isDone: TaskStatuses) => {
    setTasks({
      ...tasks,
      [taskID]: tasks[taskID].map((el) => (el.id === id ? { ...el, isDone: isDone } : el)),
    })
  }

  const changeTasksTitle = (taskID: string, id: string, title: string) => {
    setTasks({
      ...tasks,
      [taskID]: tasks[taskID].map((el) => (el.id === id ? { ...el, title: title } : el)),
    })
  }

  const removeTask = (taskID: string, id: string) => {
    setTasks({ ...tasks, [taskID]: tasks[taskID].filter((t) => t.id !== id) })
  }
  const completeRemoveTasksForTodolist = (taskID: string) => {
    delete tasks[taskID]
  }
  const addTasksForTodolist = (TaskId: string) => {
    setTasks({ ...tasks, [TaskId]: [] })
  }
  return {
    tasks,
    setTasks,
    addTask,
    changeTasksStatus,
    changeTasksTitle,
    removeTask,
    completeRemoveTasksForTodolist,
    addTasksForTodolist,
  }
}
