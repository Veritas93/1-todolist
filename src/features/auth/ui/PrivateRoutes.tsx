import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { selectIsLoggedIn } from "features/auth/model/authSlice"

export const PrivateRoutes = () => {
  const isAuth = useSelector(selectIsLoggedIn)
  return <>{isAuth ? <Outlet /> : <Navigate to={"#/login"} />}</>
}
