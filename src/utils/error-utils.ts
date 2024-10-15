import { Dispatch } from "redux"
import { setError, setStatus } from "../state/appSlice"
import { ResponceType } from "../todolists-api/todolist-api"

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponceType<T>) => {
  if (data.messages.length) {
  dispatch(setError({error: data.messages[0]}))
  } else {
    dispatch(setError({error: "Something then wrong"}))
  }
  dispatch(setStatus({status: "failed"}))
}

export const handleServerNetworkError = <T>(dispatch: Dispatch, err: { message: string }) => {
  dispatch(setError({error: err.message}))
  dispatch(setStatus({status: "failed"}))
}
