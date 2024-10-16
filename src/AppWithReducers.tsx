import { useReducer, useState } from "react"
import { Todolist } from "./features/Todolist/Todolist"
import { v1 } from "uuid"
import { AddItemForm } from "./components/addItemForm/AddItemForm"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { MenuButton } from "./MenuButton"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { amber, green } from "@mui/material/colors"
import Switch from "@mui/material/Switch"
import {
  AddTodolist,
  ChangeTodolistFilter,
  ChangeTodolistTitle,
  FilterType,
  RemoveTodolist,
  todolistsReducer,
} from "./state/todolist/todolistSlice"
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  addTask,
  removeTask,
  tasksReducer,
  updateTask,
} from "./state/task/tasksSlice"

export type TaskStateType = {
  [taskId: string]: TaskType[]
}

function AppWithReducers() {
  //BLL
  // Global States
  const TaskId2 = v1()
  const TaskId1 = v1()
  const [todoList, dispatchToTodoList] = useReducer(todolistsReducer, [
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

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [TaskId1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        description: "",
        completed: false,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: TaskId1,
        order: 0,
        addedDate: "",
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        description: "",
        completed: false,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: TaskId1,
        order: 0,
        addedDate: "",
      },
    ],
    [TaskId2]: [
      {
        id: v1(),
        title: "HW",
        status: TaskStatuses.Completed,
        description: "",
        completed: false,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: TaskId2,
        order: 0,
        addedDate: "",
      },
      {
        id: v1(),
        title: "Exam",
        status: TaskStatuses.Completed,
        description: "",
        completed: false,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: TaskId2,
        order: 0,
        addedDate: "",
      },
    ],
  })

  // Task CRUD
  const createTask = (task: TaskType) => {
    const action: any = addTask({task})
    dispatchToTasks(action)
  }

  const changeTasksStatus = (taskID: string, id: string, status: TaskStatuses) => {
    const action = updateTask({taskId: taskID, model:{ status }, todoListId: id})
    dispatchToTasks(action)
  }

  const changeTasksTitle = (taskID: string, id: string, title: string) => {
    const action = updateTask({taskId: id, model:  { title }, todoListId: taskID})
    dispatchToTasks(action)
  }

  const deleteTask = (taskID: string, id: string) => {
    const action = removeTask({taskId: id, todoListId: taskID})
    dispatchToTasks(action)
  }

  // Todolist CRUD
  const addTodolist = (titleTodo: string) => {
    const action = AddTodolist({
      todolist: {
        id: v1(),
        addedDate: "",
        order: 0,
        title: titleTodo,
      },
    })
    dispatchToTodoList(action)
    dispatchToTasks(action)
  }

  const changeFilter = (tasksId: string, NewFilterValue: FilterType) => {
    const action = ChangeTodolistFilter({ id: tasksId, filter: NewFilterValue })
    dispatchToTodoList(action)
  }

  const changeTodolistTitle = (tasksId: string, NewTitleValue: string) => {
    const action = ChangeTodolistTitle({ id: tasksId, title: NewTitleValue })
    dispatchToTodoList(action)
  }

  const removeTodolist = (taskID: string) => {
    const action = RemoveTodolist({ id: taskID })
    dispatchToTodoList(action)
    dispatchToTasks(action)
  }
  //UI
  const todolistComp: Array<JSX.Element> = todoList.map((el) => {
    let filterTasksForTodolist: TaskType[] = tasks[el.id]
    if (el.filter === "active") {
      filterTasksForTodolist = filterTasksForTodolist.filter((t) => t.status === TaskStatuses.New)
    }
    if (el.filter === "completed") {
      filterTasksForTodolist = filterTasksForTodolist.filter((t) => t.status === TaskStatuses.Completed)
    }

    return (
      <Grid item>
        <Paper sx={{ p: "20px 15px" }} elevation={8}>
          <Todolist
            key={el.id}
            tasksId={el.id}
            filter={el.filter}
            title={el.title}
            tasks={filterTasksForTodolist}
            date="30.01.2024"
            removeTask={deleteTask}
            changeFilter={changeFilter}
            addTask={createTask}
            changeTasksStatus={changeTasksStatus}
            removeTodolist={removeTodolist}
            changeTasksTitle={changeTasksTitle}
            changeTodolistTitle={changeTodolistTitle}
          />
        </Paper>
      </Grid>
    )
  })
  const [isLight, setIsLight] = useState(true)
  const theme = createTheme({
    palette: {
      primary: green,
      secondary: amber,
      mode: isLight ? "light" : "dark",
    },
  })
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <div>
              <MenuButton>Login</MenuButton>
              <MenuButton>Logout</MenuButton>
              <MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
              <Switch color="secondary" onChange={() => setIsLight(!isLight)} />
            </div>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid container sx={{ p: "10px 0" }}>
            <AddItemForm addItem={addTodolist} />
          </Grid>
          <Grid container spacing={4}>
            {todolistComp}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default AppWithReducers
