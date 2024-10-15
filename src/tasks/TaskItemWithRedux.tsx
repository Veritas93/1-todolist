import { ChangeEvent, useCallback } from "react"
import { EditableSpan } from "../components/editableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import Checkbox from "@mui/material/Checkbox"
import ListItem from "@mui/material/ListItem"
import { getListItemSx } from "../features/Todolist/Todolist.Styles"
import { TaskStatuses, deleteTaskTC, updateTaskTC } from "state/task/tasksSlice"
import { useAppDispatch } from "../state/store"

type TaskItemType = {
  tasksId: string
  id: string
  isDone: TaskStatuses
  title: string
}

export const TaskItemWithRedux = ({ tasksId, id, isDone, title }: TaskItemType) => {
  console.log("Task")
  const dispatch = useAppDispatch()
  const changeTasksStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      dispatch(updateTaskTC(tasksId, { status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New }, id))
    },
    [dispatch],
  )
  const removeTaskHandler = useCallback(() => {
    dispatch(deleteTaskTC(tasksId, id))
  }, [dispatch])

  const changeTasksTitleCallback = useCallback(
    (newTitle: string) => {
      dispatch(updateTaskTC(tasksId, { title: newTitle }, id))
    },
    [dispatch],
  )
  return (
    <ListItem disablePadding key={id} sx={getListItemSx(isDone === TaskStatuses.Completed)}>
      <div>
        <Checkbox
          size="small"
          color="secondary"
          checked={isDone === TaskStatuses.Completed}
          onChange={changeTasksStatusHandler}
        />
        <EditableSpan title={title} changeTitle={changeTasksTitleCallback} />
      </div>
      <IconButton onClick={removeTaskHandler} color="primary">
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </ListItem>
  )
}
