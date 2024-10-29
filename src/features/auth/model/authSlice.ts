import { setIsInitialized, setStatus } from "app/model/appSlice"
import { authApi } from "features/auth/api/auth-api"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { createSlice } from "@reduxjs/toolkit"
import { ClearData } from "features/todolist/model/todolistSlice"
import { LoginType } from "../api/authApi.types"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
/**
 *
 */
const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {},
  selectors: {
    selectIsLoggedIn: (sliceState) => sliceState.isLoggedIn,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(initializedApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

export const authReducer = authSlice.reducer
export const { selectIsLoggedIn } = authSlice.selectors

// thunks
export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, { data: LoginType }>(
  `${authSlice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setStatus({ status: "loading" }))
      const result = await authApi.login(arg.data)
      if (result.data.resultCode === 0) {
        dispatch(setStatus({ status: "succeeded" }))
        return { isLoggedIn: true }
      } else {

        const isShowAppError = !result.data.fieldsErrors.length
        debugger
        handleServerAppError(dispatch, result.data, isShowAppError)
        return rejectWithValue(result.data)
      }
    } catch (err) {
      handleServerNetworkError(dispatch, err)
      return rejectWithValue(null)
    }
  },
)

export const initializedApp = createAppAsyncThunk<{ isLoggedIn: true }, undefined>(
  `${authSlice.name}/initializedApp`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setStatus({ status: "loading" }))
      const result = await authApi.me()
      if (result.data.resultCode === 0) {
        dispatch(setStatus({ status: "succeeded" }))
        return { isLoggedIn: true }
      } else {
        handleServerAppError(dispatch, result.data)
        return rejectWithValue(null)
      }
    } catch (err) {
      handleServerNetworkError(dispatch, err)
      return rejectWithValue(null)
    } finally {
      dispatch(setIsInitialized({ isInitialized: true }))
    }
  },
)

export const logOut = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${authSlice.name}/logOut`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setStatus({ status: "loading" }))
      const result = await authApi.logOut()
      if (result.data.resultCode === 0) {
        dispatch(setStatus({ status: "succeeded" }))
        dispatch(ClearData())
        return { isLoggedIn: false }
      } else {
        handleServerAppError(dispatch, result.data)
        return rejectWithValue(null)
      }
    } catch (err) {
      handleServerNetworkError(dispatch, err)
      return rejectWithValue(null)
    }
  },
)
