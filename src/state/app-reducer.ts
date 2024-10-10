export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as null | string,
  isInitialized: false,
};

type InitialStateType = typeof initialState;

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-IS-INITIALIZED": {
      return {...state, isInitialized: action.payload.isInitialized}
    }
    case 'APP/SET-STATUS':
      return { ...state, status: action.payload.status };
    case 'APP/SET-ERROR':
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export const setStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', payload: { status } } as const);
export const setErrorAC = (error: string | null) =>
  ({ type: 'APP/SET-ERROR', payload: { error } } as const);
export const setIsInitializedAC = (isInitialized: boolean) =>
  ({ type: 'APP/SET-IS-INITIALIZED', payload: { isInitialized } } as const);

export type SetAppErrorType = ReturnType<typeof setErrorAC>;
export type SetAppStatusType = ReturnType<typeof setStatusAC>;
export type SetAppIsInitialized = ReturnType<typeof setIsInitializedAC>
type ActionsType = SetAppStatusType | SetAppErrorType | SetAppIsInitialized ;
