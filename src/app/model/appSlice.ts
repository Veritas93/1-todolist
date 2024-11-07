import { PayloadAction, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { addTodo } from "features/todolist/model/todolistSlice"
import { act } from "react-dom/test-utils"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "loading" as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
  },
  reducers: {
    setStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state, action: any) => {
        state.status = "failed"
        if (action.type === addTodo.rejected.type) {
          return
        }
          if (action.payload) {
            state.error = action.payload.messages[0]
          } else {
            state.error = action.error.message ? action.error.message : "Some error occurred"
          }
      })
  },
  selectors: {
    selectStatus: (sliceState) => sliceState.status,
    selectIsInitialized: (sliceState) => sliceState.isInitialized,
    selectError: (sliceState) => sliceState.error,
  },
})

export const appReducer = appSlice.reducer
export const { setError, setStatus, setIsInitialized } = appSlice.actions
export const { selectStatus, selectIsInitialized, selectError } = appSlice.selectors

export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
export type SetAppErrorType = ReturnType<typeof setError>
export type SetAppStatusType = ReturnType<typeof setStatus>
