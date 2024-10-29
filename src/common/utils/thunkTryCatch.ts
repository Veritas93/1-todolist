import { setStatus } from "app/model/appSlice"
import { handleServerNetworkError } from "./handleServerNetworkError"
import { AppDispatch, AppRootStateType } from "app/model/store"

type ThunkApi = {
    dispatch: AppDispatch
    getState: () => AppRootStateType,
    rejectWithValue: (value: any) => any
  }

export const thunkTryCatch = async <T>(
  thunkAPI: ThunkApi,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(setStatus({ status: "loading" }))
    return await logic()
  } catch (err) {
    handleServerNetworkError(dispatch, err)
    return rejectWithValue(null)
  } finally {
    dispatch(setStatus({ status: "idle" }))
  }
}
