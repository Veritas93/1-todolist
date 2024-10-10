import { Dispatch } from 'redux';
import { SetAppStatusType, SetAppErrorType, setStatusAC, setIsInitializedAC, SetAppIsInitialized } from '../app-reducer';
import { LoginType } from '../../features/Login/Login';
import { authApi } from '../../auth-api/auth-api';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';

const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', value } as const);


// thunks
export const loginTC =
  (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'));
    try {
      const result = await authApi.login(data)
      if(result.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setStatusAC('succeeded'));
      } else {
        handleServerAppError(dispatch, result.data)
      }
    } catch (error) {
        handleServerNetworkError(dispatch, (error as unknown as {message: string}))
        dispatch(setStatusAC('failed'));
    }
  };

  export const meTC =
  () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'));
    try {
      const result = await authApi.me()
      if(result.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setStatusAC('succeeded'));
      } else {
        handleServerAppError(dispatch, result.data)
      }
    } catch (error) {
        handleServerNetworkError(dispatch, (error as unknown as {message: string}))
        dispatch(setStatusAC('failed'));
    }
    dispatch(setIsInitializedAC(true)) 
       
  };

  export const logOutTC =
  () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'));
    try {
      const result = await authApi.logOut()
      if(result.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setStatusAC('succeeded'));
      } else {
        handleServerAppError(dispatch, result.data)
      }
    } catch (error) {
        handleServerNetworkError(dispatch, (error as unknown as {message: string}))
        dispatch(setStatusAC('failed'));
    }
  };

// types
type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusType
  | SetAppErrorType
  | SetAppIsInitialized
