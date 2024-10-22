import { Dispatch } from "redux"
import { setError, setStatus } from "../../app/model/appSlice"
import { BaseResponse } from "common/types/commonType"

export const handleServerAppError = <T>(dispatch: Dispatch, data: BaseResponse<T>) => {
  if (data.messages.length) {
    dispatch(setError({ error: data.messages[0] }))
  } else {
    dispatch(setError({ error: "Something then wrong" }))
  }
  dispatch(setStatus({ status: "failed" }))
}
