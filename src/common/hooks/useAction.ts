import { useAppDispatch } from "app/model/store"
import { useMemo } from "react"
import { ActionCreatorsMapObject, bindActionCreators } from "redux"

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
    const dispatch = useAppDispatch()
    return useMemo(()=> bindActionCreators<T, RemapActionCreators<T>>(actions, dispatch), [actions, dispatch])
}

type isValidArg<T> = T extends object ? (keyof T extends never ? false : true): true

type ActionCreatorResponse< T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>

type ReplaceReturnType<T, TNewReturn> = T extends (...arg: any[]) => infer R ? 
isValidArg<Extract<T, (...args: any[]) => any>> extends true ?
(...args: Parameters<Extract<T, (...args: any[])=> any>>) => TNewReturn : ()=> TNewReturn : never 

type RemapActionCreators<T extends ActionCreatorsMapObject> = {
    [K in keyof T  ]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>
}