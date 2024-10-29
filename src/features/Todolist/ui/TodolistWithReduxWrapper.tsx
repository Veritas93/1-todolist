import { TodolistWithRedux } from "./TodolistWithRedux"
import { useAppWithRedux } from "app/appWithRedux/hooks/useAppWithRedux"
import { Grid, Paper } from "@mui/material"
import { useAppDispatch, useAppSelector } from "app/model/store"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import { useEffect } from "react"
import { getTodos} from "features/todolist/model/todolistSlice"
import { selectIsLoggedIn } from "features/auth/model/authSlice"

//UI
export const TodolistWithReduxWrapper = () => {
  const dispatch = useAppDispatch()
  const { todoLists, addTodolist } = useAppWithRedux()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(getTodos())
  }, [])

  return (
    <>
      <Grid container sx={{ p: "40px 0  10px 0" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      {todoLists.map((el) => {
        return (
          <Grid key={el.id} item>
            <Paper sx={{ p: "20px 15px" }} elevation={8}>
              <TodolistWithRedux todolist={el} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
