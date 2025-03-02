import ReactDOM from "react-dom/client"
import "./index.css"
import AppWithRedux from "./app/appWithRedux/AppWithRedux"
import { Provider } from "react-redux"
import { store } from "./app/model/store"
import { Navigate, RouteObject, RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom"
import { Login } from "./features/auth/ui/Login"
import { TodolistWithReduxWrapper } from "./features/todolist/ui/TodolistWithReduxWrapper"
import { ErrorPage } from "./common/components/ErrorPage/ErrorPage"
import { PrivateRoutes } from "features/auth/ui/PrivateRoutes"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

export const PATH = {
  TODOLISTS: "/todolists",
  ERROR: "/error",
  LOGIN: "/login",
  ROOT: "/1-todolist"
} as const

const publicRoutes: RouteObject[] = [
  { path: PATH.LOGIN, element: <Login /> },
  { path: PATH.ERROR, element: <ErrorPage /> },
]

const privateRoutes: RouteObject[] = [{ path: PATH.TODOLISTS, element: <TodolistWithReduxWrapper /> }]

const router = createHashRouter([
  {
    path: "/",
    element: <AppWithRedux />,
    errorElement: <Navigate to={PATH.ERROR} />,
    children: [
      {
        index: true,
        element: <Navigate to={PATH.TODOLISTS} />,
      },
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
    ],
  },
], 
)

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
