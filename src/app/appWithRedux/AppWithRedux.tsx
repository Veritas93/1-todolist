import { useCallback, useEffect, useState } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { MenuButton } from "../../common/components/button/MenuButton"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import LinearProgress from "@mui/material/LinearProgress"
import { amber, green } from "@mui/material/colors"
import Switch from "@mui/material/Switch"
import { useAppDispatch, useAppSelector } from "../model/store"
import { selectIsInitialized, selectStatus } from "../model/appSlice"
import { CustomizedSnackbars } from "../../common/components/ErrorSnackBar/errorSnackBar"
import { Outlet } from "react-router-dom"
import { logOut, initializedApp, selectIsLoggedIn } from "../../features/auth/model/authSlice"
import CircularProgress from "@mui/material/CircularProgress"
import { TaskType } from "common/types/commonType"

function AppWithRedux() {
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const isInitialized = useAppSelector(selectIsInitialized)

  const dispatch = useAppDispatch()
  const logout = useCallback(() => {
    dispatch(logOut())
  }, [])

  //DAL

  useEffect(() => {
    dispatch(initializedApp())
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
              {isLoggedIn && <MenuButton onClick={logout}>Logout</MenuButton>}
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
