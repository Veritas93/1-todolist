import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import Box from "@mui/material/Box"
import { buttonsContainerSx } from "../Todolist.Styles"
import { useSelector } from "react-redux"
import { useAppDispatch } from "app/model/store"
import { addTask, selectTasks } from "features/todolist/task/model/tasksSlice"
import {
  ChangeTodolistFilter,
  TodolistDomainType,
  changeTodolistTitleTC,
  removeTodo,
} from "features/todolist/model/todolistSlice"
import { TaskItemWithRedux } from "features/todolist/task/ui/TaskItemWithRedux"
import { memo, useCallback, useMemo } from "react"
import { ButtonWrapper } from "common/components/button/Button"
import { TaskStatuses } from "features/todolist/lib/enums/enums"

export type TodolistPropsType = {
  todolist: TodolistDomainType
}

export const TodolistWithRedux = memo(({ todolist }: TodolistPropsType) => {
  console.log("TodolistWithRedux")
  let date = "30.01.2024"
  const { id, title, filter } = todolist
  /// подумать
  let tasksSelector = useSelector(selectTasks)
  let tasks = tasksSelector[id]

  // <AppRootStateType, TaskType[]>((state) => state.tasks[id])

  const dispatch = useAppDispatch()

  const addItemCallback = useCallback((taskTitle: string) => {
    dispatch(addTask({ todoId: id, title: taskTitle }))
  }, [])

  const changeTodolistTitleCallback = useCallback(
    (newTitle: string) => {
      dispatch(changeTodolistTitleTC(id, newTitle))
    },
    [dispatch],
  )

  const setAllTasksHandler = useCallback(() => {
    dispatch(ChangeTodolistFilter({ id, filter: "all" }))
  }, [dispatch])

  const setActiveTasksHandler = useCallback(() => {
    dispatch(ChangeTodolistFilter({ id, filter: "active" }))
  }, [dispatch])

  const setCompletedTasksHandler = useCallback(() => {
    dispatch(ChangeTodolistFilter({ id, filter: "completed" }))
  }, [dispatch])

  const removeTodolistHandler = useCallback(() => {
    dispatch(removeTodo({ todoId: id }))
  }, [dispatch])

  tasks = useMemo(() => {
    console.log("useMemo")
    if (filter === "active") {
      tasks = tasks.filter((t) => t.status === TaskStatuses.New)
    }
    if (filter === "completed") {
      tasks = tasks.filter((t) => t.status === TaskStatuses.Completed)
    }
    return tasks
  }, [tasks, filter])

  const TaskMap = tasks.map((task) => {
    return <TaskItemWithRedux key={task.id} tasksId={id} id={task.id} isDone={task.status} title={task.title} />
  })

  return (
    <div>
      <h3>
        <EditableSpan title={title} changeTitle={changeTodolistTitleCallback} />
        <IconButton onClick={removeTodolistHandler} color="primary" disabled={todolist.entityStatus === "loading"}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </h3>
      <AddItemForm addItem={addItemCallback} disabled={todolist.entityStatus === "loading"} />
      {tasks.length === 0 ? <p>Тасок нет</p> : <List>{TaskMap}</List>}
      <Box sx={buttonsContainerSx}>
        <ButtonWrapper 
        title={"all"} 
        color={filter === "all" ? "secondary" : "primary"}
         onClick={setAllTasksHandler} />
        <ButtonWrapper
          title={"active"}
          color={filter === "active" ? "secondary" : "primary"}
          onClick={setActiveTasksHandler}
        />
        <ButtonWrapper
          title={"completed"}
          color={filter === "completed" ? "secondary" : "primary"}
          onClick={setCompletedTasksHandler}
        />
      </Box>
      <div>{date}</div>
    </div>
  )
})
