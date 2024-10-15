import { action } from '@storybook/addon-actions';
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"


const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "loading" as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
  },
  reducers: {
    setStatus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
      state.status = action.payload.status
    },
    setError: (state, action: PayloadAction<{error: string | null}>) => {
      state.error = action.payload.error
    },
    setIsInitialized: (state, action: PayloadAction<{isInitialized: boolean}>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = appSlice.reducer
export const {setError, setStatus, setIsInitialized} = appSlice.actions

export type AppInitialState = ReturnType<typeof appSlice.getInitialState>

// 

export type SetAppErrorType = ReturnType<typeof setError>
export type SetAppStatusType = ReturnType<typeof setStatus>
// export type SetAppIsInitialized = ReturnType<typeof setIsInitializedAC>
// type ActionsType = SetAppStatusType | SetAppErrorType | SetAppIsInitialized
