import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { TaskItem } from "../../tasks/TaskItem"
import { AddItemForm } from "../../components/addItemForm/AddItemForm"
import { EditableSpan } from "../../components/editableSpan/EditableSpan"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import Box from "@mui/material/Box"
import { buttonsContainerSx } from "./Todolist.Styles"
import { FilterType } from "../../state/todolist/todolistSlice"
import { TaskPriorities, TaskStatuses, TaskType } from "../../state/task/tasksSlice"

export type TodolistPropsType = {
  tasksId: string
  filter: FilterType
  title: string
  tasks: TaskType[]
  date?: string

  removeTask: (taskID: string, id: string) => void
  changeFilter: (tasksId: string, NewFilterValue: FilterType) => void
  addTask: (task: TaskType) => void
  changeTasksStatus: (taskID: string, id: string, status: TaskStatuses) => void
  removeTodolist: (taskID: string) => void
  changeTasksTitle: (taskID: string, id: string, title: string) => void
  changeTodolistTitle: (taskID: string, title: string) => void
}

export const Todolist = ({
  filter,
  tasksId,
  title,
  tasks,
  date,
  removeTask,
  changeFilter,
  addTask,
  changeTasksStatus,
  removeTodolist,
  changeTasksTitle,
  changeTodolistTitle,
}: TodolistPropsType) => {
  const TaskMap = tasks.map((task) => {
    return (
      <TaskItem
        tasksId={tasksId}
        id={task.id}
        isDone={task.status}
        title={task.title}
        removeTask={removeTask}
        changeTasksStatus={changeTasksStatus}
        changeTasksTitle={changeTasksTitle}
      />
    )
  })

  const addItemCallback = (taskTitle: string) => {
    addTask({
      description: "",
      title: taskTitle,
      completed: false,
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      id: "",
      todoListId: "",
      order: 0,
      addedDate: "",
    })
  }

  const changeTodolistTitleCallback = (newTitle: string) => {
    changeTodolistTitle(tasksId, newTitle)
  }

  const setAllTasksHandler = () => {
    changeFilter(tasksId, "all")
  }

  const setActiveTasksHandler = () => {
    changeFilter(tasksId, "active")
  }

  const setCompletedTasksHandler = () => {
    changeFilter(tasksId, "completed")
  }
  return (
    <div>
      <h3>
        <EditableSpan title={title} changeTitle={changeTodolistTitleCallback} />
        <IconButton onClick={() => removeTodolist(tasksId)} color="primary">
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </h3>
      <AddItemForm addItem={addItemCallback} />
      {tasks && (tasks.length === 0 ? <p>Тасок нет</p> : <List>{TaskMap}</List>)}
      {/* filter={filter} */}
      <Box sx={buttonsContainerSx}>
        <Button
          size="small"
          variant="contained"
          disableElevation
          color={filter === "all" ? "secondary" : "primary"}
          onClick={setAllTasksHandler}
        >
          all
        </Button>
        <Button
          size="small"
          variant="contained"
          disableElevation
          color={filter === "active" ? "secondary" : "primary"}
          onClick={setActiveTasksHandler}
        >
          active
        </Button>
        <Button
          size="small"
          variant="contained"
          disableElevation
          color={filter === "completed" ? "secondary" : "primary"}
          onClick={setCompletedTasksHandler}
        >
          completed
        </Button>
      </Box>
      <div>{date}</div>
    </div>
  )
}
