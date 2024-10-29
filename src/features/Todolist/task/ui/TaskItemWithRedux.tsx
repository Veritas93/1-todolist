import { ChangeEvent, useCallback } from "react"
import { EditableSpan } from "../../../../common/components/editableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import Checkbox from "@mui/material/Checkbox"
import ListItem from "@mui/material/ListItem"
import { getListItemSx } from "../../Todolist.Styles"
import { deleteTask, updateTask } from "features/todolist/task/model/tasksSlice"
import { useAppDispatch } from "../../../../app/model/store"
import { TaskStatuses } from "features/todolist/lib/enums/enums"

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
      let status = e.currentTarget.checked
      dispatch(
        updateTask({
          todoId: tasksId,
          domainModel: { status: status ? TaskStatuses.Completed : TaskStatuses.New },
          taskId: id,
        }),
      )
    },
    [dispatch],
  )
  const removeTaskHandler = useCallback(() => {
    dispatch(deleteTask({ taskId: id, todoId: tasksId }))
  }, [dispatch])

  const changeTasksTitleCallback = useCallback(
    (title: string) => {
      dispatch(updateTask({ todoId: tasksId, domainModel: { title }, taskId: id }))
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
