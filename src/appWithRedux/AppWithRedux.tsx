import { useCallback, useEffect, useState } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { MenuButton } from "../MenuButton"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import LinearProgress from "@mui/material/LinearProgress"
import { amber, green } from "@mui/material/colors"
import Switch from "@mui/material/Switch"
import { getTodosTC } from "../state/todolist/todolistSlice"
import { TaskType } from "../state/task/tasksSlice"
import { useAppDispatch, useAppSelector } from "../state/store"
import { RequestStatusType, setStatus } from "../state/appSlice"
import { CustomizedSnackbars } from "../components/ErrorSnackBar/errorSnackBar"
import { Outlet } from "react-router-dom"
import { logOutTC, meTC } from "../state/auth/authSlice"
import CircularProgress from "@mui/material/CircularProgress"

function AppWithRedux() {
  const status = useAppSelector<RequestStatusType>((s) => s.app.status)
  const isLoggedIn = useAppSelector((i) => i.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector<boolean>((init) => init.app.isInitialized)
  const logOut = useCallback(() => {
    dispatch(logOutTC())
  }, [])

  //DAL
  // useEffect(() => {
  //   if (isInitialized || !isLoggedIn) {
  //     return
  //   }
  //   dispatch(getTodosTC())
  // }, [])

  useEffect(() => {
    dispatch(meTC())
  }, [])

  //BLL
  // Global States

  const [isLight, setIsLight] = useState(true)
  const theme = createTheme({
    palette: {
      primary: green,
      secondary: amber,
      mode: isLight ? "light" : "dark",
    },
  })
  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }
  return (
    <div>
      <CustomizedSnackbars />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <div>
              {isLoggedIn && <MenuButton onClick={logOut}>Logout</MenuButton>}
              <MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
              <Switch color="secondary" onChange={() => setIsLight(!isLight)} />
            </div>
          </Toolbar>
        </AppBar>

        {status === "loading" && <LinearProgress color="secondary" />}
        <Container fixed>
          <Grid container spacing={4} sx={{ p: "60px 0" }}>
            <Outlet />
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default AppWithRedux

export type TaskStateType = {
  [taskId: string]: TaskType[]
}
