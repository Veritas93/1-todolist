import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppRootStateType, AppDispatch } from "../../app/model/store"
import { BaseResponse } from "common/types/commonType"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: AppDispatch
  rejectValue: null | BaseResponse
}>()
