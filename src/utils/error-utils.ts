import { Dispatch } from 'redux';
import { setErrorAC, setStatusAC } from '../state/app-reducer';
import { ResponceType } from '../todolists-api/todolist-api';

export const handleServerAppError = <T>(
  dispatch: Dispatch,
  data: ResponceType<T>
) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]));
  } else {
    dispatch(setErrorAC('Something then wrong'));
  }
  dispatch(setStatusAC('failed'));
};

export const handleServerNetworkError = <T>(dispatch: Dispatch, err: {message: string}) => {
  dispatch(setErrorAC(err.message));
  dispatch(setStatusAC('failed'));
};
