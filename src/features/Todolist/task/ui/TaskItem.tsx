import { ChangeEvent } from "react"
import { EditableSpan } from "common/components/editableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import Checkbox from "@mui/material/Checkbox"
import ListItem from "@mui/material/ListItem"
import { getListItemSx } from "features/todolist/Todolist.Styles"
import { TaskStatuses } from "features/todolist/lib/enums/enums"

type TaskItemType = {
  tasksId: string
  id: string
  isDone: TaskStatuses
  title: string
  removeTask: (taskID: string, id: string) => void
  changeTasksStatus: (taskID: string, id: string, status: TaskStatuses) => void
  changeTasksTitle: (taskID: string, id: string, title: string) => void
}

export const TaskItem = ({
  tasksId,
  id,
  isDone,
  title,
  removeTask,
  changeTasksStatus,
  changeTasksTitle,
}: TaskItemType) => {
  const changeTasksStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeTasksStatus(tasksId, id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
  }
  const removeTaskHandler = () => {
    removeTask(tasksId, id)
  }

  const changeTasksTitleCallback = (newTitle: string) => {
    changeTasksTitle(tasksId, id, newTitle)
  }
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
