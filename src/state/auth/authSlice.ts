import { setIsInitialized, setStatus } from "../appSlice"
import { LoginType } from "features/Login/Login"
import { authApi } from "auth-api/auth-api"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunkType } from "state/store"
import { ClearData } from "state/todolist/todolistSlice"

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn } = authSlice.actions

// thunks
export const loginTC =
  (data: LoginType): AppThunkType =>
  async (dispatch) => {
    dispatch(setStatus({status: "loading"}))
    try {
      const result = await authApi.login(data)
      if (result.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setStatus({status: "succeeded"}))
      } else {
        handleServerAppError(dispatch, result.data)
      }
    } catch (error) {
      handleServerNetworkError(dispatch, error as unknown as { message: string })
      dispatch(setStatus({status: "failed"}))
    }
  }

export const meTC = (): AppThunkType => async (dispatch) => {
  dispatch(setStatus({status: "loading"}))
  try {
    const result = await authApi.me()
    if (result.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      dispatch(setStatus({status: "succeeded"}))
    } else {
      handleServerAppError(dispatch, result.data)
    }
  } catch (error) {
    handleServerNetworkError(dispatch, error as unknown as { message: string })
    dispatch(setStatus({status: "failed"}))
  }
  dispatch(setIsInitialized({isInitialized: true}))
}

export const logOutTC = (): AppThunkType => async (dispatch) => {
  dispatch(setStatus({status: "loading"}))
  try {
    const result = await authApi.logOut()
    if (result.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      dispatch(setStatus({status: "succeeded"}))
      dispatch(ClearData())
    } else {
      handleServerAppError(dispatch, result.data)
    }
  } catch (error) {
    handleServerNetworkError(dispatch, error as unknown as { message: string })
    dispatch(setStatus({status: "failed"}))
  }
}
