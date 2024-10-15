import { useCallback } from "react"
import { TodolistDomainType, addTodosTC } from "../../state/todolist/todolistSlice"

import { useSelector } from "react-redux"
import { AppRootStateType, useAppDispatch } from "../../state/store"
import { getTasksTC } from "../../state/task/tasksSlice"

export const useAppWithRedux = () => {
  const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>((state) => state.todolists)

  const dispatch = useAppDispatch()

  // Task CRUD
  // const addTask = useCallback(
  //   (taskID: string, title: string) => {
  //     const action = addTaskAC(title, taskID);
  //     dispatch(action);
  //   },
  //   [dispatch]
  // );

  // const changeTasksStatus = useCallback(
  //   (taskID: string, id: string, isDone: boolean) => {
  //     dispatch(changeTaskStatusAC(taskID, isDone, id));
  //   },
  //   [dispatch]
  // );

  // const changeTasksTitle = useCallback(
  //   (taskID: string, id: string, title: string) => {
  //     dispatch(changeTaskTitleAC(id, title, taskID));
  //   },
  //   [dispatch]
  // );

  // const removeTask = useCallback(
  //   (taskID: string, id: string) => {
  //     dispatch(removeTaskAC(id, taskID));
  //   },
  //   [dispatch]
  // );

  // Todolist CRUD
  const addTodolist = useCallback(
    (titleTodo: string) => {
      dispatch(addTodosTC(titleTodo))
    },
    [dispatch],
  )

  // const changeFilter = useCallback(
  //   (tasksId: string, NewFilterValue: FilterType) => {
  //     dispatch(ChangeTodolistFilterAC(tasksId, NewFilterValue));
  //   },
  //   [dispatch]
  // );

  // const changeTodolistTitle = useCallback(
  //   (tasksId: string, NewTitleValue: string) => {
  //     dispatch(ChangeTodolistTitleAC(tasksId, NewTitleValue));
  //   },
  //   [dispatch]
  // );

  // const removeTodolist = useCallback(
  //   (taskID: string) => {
  //     dispatch(RemoveTodolistAC(taskID));
  //   },
  //   [dispatch]
  // );
  return { todoLists, addTodolist }
}
