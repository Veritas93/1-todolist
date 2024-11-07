import { setIsInitialized} from "app/model/appSlice"
import { authApi } from "features/auth/api/auth-api"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { PayloadAction, createSlice, isFulfilled} from "@reduxjs/toolkit"
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
    builder.addMatcher(
      isFulfilled(login, logOut, initializedApp),
      (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn
      },
    )
  },
})

export const authReducer = authSlice.reducer
export const { selectIsLoggedIn } = authSlice.selectors

// thunks
export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, { data: LoginType }>(
  `${authSlice.name}/login`,
  async (arg, { dispatch, rejectWithValue }) => {
      const result = await authApi.login(arg.data)
      if (result.data.resultCode === 0) {
        return { isLoggedIn: true }
      } else {
        return rejectWithValue(result.data)
      }}
)

export const initializedApp = createAppAsyncThunk<{ isLoggedIn: true }, undefined>(
  `${authSlice.name}/initializedApp`,
  async (_, { dispatch, rejectWithValue }) => {
      const result = await authApi.me().finally(()=>{
        dispatch(setIsInitialized({ isInitialized: true }))
      })
      if (result.data.resultCode === 0) {
        return { isLoggedIn: true }
      } else {
        handleServerAppError(dispatch, result.data)
        return rejectWithValue(null)
      }
    } 
)

export const logOut = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${authSlice.name}/logOut`,
  async (_, { dispatch, rejectWithValue }) => {
      const result = await authApi.logOut()
      if (result.data.resultCode === 0) {
        dispatch(ClearData())
        return { isLoggedIn: false }
      } else {
        return rejectWithValue(result.data)
      }
    } 
)
