import { setIsInitialized, setStatus } from "app/model/appSlice"
import { authApi } from "features/auth/api/auth-api"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppThunkType } from "app/model/store"
import { ClearData } from "features/todolist/model/todolistSlice"
import { LoginType } from "../api/authApi.types"

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  selectors: {
    selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.selectors

// thunks
export const loginTC =
  (data: LoginType): AppThunkType =>
  async (dispatch) => {
    dispatch(setStatus({ status: "loading" }))
    try {
      const result = await authApi.login(data)
      if (result.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(dispatch, result.data)
      }
    } catch (error) {
      handleServerNetworkError(dispatch, error as unknown as { message: string })
      dispatch(setStatus({ status: "failed" }))
    }
  }

export const meTC = (): AppThunkType => async (dispatch) => {
  dispatch(setStatus({ status: "loading" }))
  try {
    const result = await authApi.me()
    if (result.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      dispatch(setStatus({ status: "succeeded" }))
    } else {
      handleServerAppError(dispatch, result.data)
    }
  } catch (error) {
    handleServerNetworkError(dispatch, error as unknown as { message: string })
    dispatch(setStatus({ status: "failed" }))
  }
  dispatch(setIsInitialized({ isInitialized: true }))
}

export const logOutTC = (): AppThunkType => async (dispatch) => {
  dispatch(setStatus({ status: "loading" }))
  try {
    const result = await authApi.logOut()
    if (result.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      dispatch(setStatus({ status: "succeeded" }))
      dispatch(ClearData())
    } else {
      handleServerAppError(dispatch, result.data)
    }
  } catch (error) {
    handleServerNetworkError(dispatch, error as unknown as { message: string })
    dispatch(setStatus({ status: "failed" }))
  }
}
