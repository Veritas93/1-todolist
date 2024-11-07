import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import Box from "@mui/material/Box"
import { buttonsContainerSx } from "./Todolist.Styles"
import {  useAppDispatch, useAppSelector } from "app/model/store"
import { addTask, selectFilteredTasks} from "features/todolist/task/model/tasksSlice"
import {
  TodolistDomainType,
  changeTodolistTitleTC,
  removeTodo,
} from "features/todolist/model/todolistSlice"
import { TaskItemWithRedux } from "features/todolist/task/ui/TaskItemWithRedux"
import { FilterTaskButtons } from "./filterTasksButtons/FilterTaskButtons"

export type TodolistPropsType = {
  todolist: TodolistDomainType
}

export const TodolistWithRedux = ({ todolist }: TodolistPropsType) => {
  console.log("TodolistWithRedux")
  let date = "30.01.2024"
  const dispatch = useAppDispatch()
  const { id, title, filter } = todolist
 
  let tasksFilteredSelector = useAppSelector((state) => selectFilteredTasks(state, id, filter))
 
  
  const addItemCallback = (taskTitle: string) => {
    dispatch(addTask({ todoId: id, title: taskTitle }))
  }
  const changeTodolistTitleHandler = 
    (newTitle: string) => {
      dispatch(changeTodolistTitleTC(id, newTitle))
    }
  const removeTodolistHandler = () => {
    dispatch(removeTodo({ todoId: id }))
  }

  const TaskMap = tasksFilteredSelector.map((task) => {
    return <TaskItemWithRedux key={task.id} tasksId={id} id={task.id} isDone={task.status} title={task.title} />
  })

  return (
    <div>
      <h3>
        <EditableSpan title={title} changeTitle={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} color="primary" disabled={todolist.entityStatus === "loading"}>
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </h3>
      <AddItemForm addItem={addItemCallback} disabled={todolist.entityStatus === "loading"} />
      {tasksFilteredSelector.length === 0 ? <p>Тасок нет</p> : <List>{TaskMap}</List>}
      <Box sx={buttonsContainerSx}>
        <FilterTaskButtons id={id} filter={filter}/>
      </Box>
      <div>{date}</div>
    </div>
  )
}
