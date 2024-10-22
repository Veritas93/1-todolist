import { setError, setStatus } from "../../app/model/appSlice"
import { AppDispatchType } from "app/model/store"
import axios from "axios"

// export const handleServerNetworkError = <T>(dispatch: Dispatch, err: { message: string }) => {
//   dispatch(setError({error: err.message}))
//   dispatch(setStatus({status: "failed"}))
// }

export const handleServerNetworkError = (dispatch: AppDispatchType, err: unknown): void => {
  let errorMessage = "Some error occurred"

  // проверка на наличие axios ошибки
  if (axios.isAxiosError(err)) {
    // err.response?.data?.message - например получение тасок с невалидным todolistId
    // err?.message - например при создании тасок в offline режиме
    errorMessage = err.response?.data?.message || err?.message || errorMessage
    // проверка на наличии нативной ошибки
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
    // какой то не понятный кейс
  } else {
    errorMessage = JSON.stringify(err)
  }
  dispatch(setError({ error: errorMessage }))
  dispatch(setStatus({ status: "failed" }))
}
