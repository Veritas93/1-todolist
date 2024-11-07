import { ChangeEvent } from "react"
import { EditableSpan } from "../../../../common/components/editableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import Checkbox from "@mui/material/Checkbox"
import ListItem from "@mui/material/ListItem"
import { deleteTask, updateTask } from "features/todolist/task/model/tasksSlice"
import { useAppDispatch } from "../../../../app/model/store"
import { TaskStatuses } from "features/todolist/lib/enums/enums"
import { getListItemSx } from "features/todolist/ui/Todolist.Styles"

type Props = {
  tasksId: string
  id: string
  isDone: TaskStatuses
  title: string
}

export const TaskItemWithRedux = ({ tasksId, id, isDone, title }: Props) => {
  console.log("Task")
  const dispatch = useAppDispatch()
  const changeTasksStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked
    dispatch(
      updateTask({
        todoId: tasksId,
        domainModel: { status: status ? TaskStatuses.Completed : TaskStatuses.New },
        taskId: id,
      }),
    )
  }

  const removeTaskHandler = () => {
    dispatch(deleteTask({ taskId: id, todoId: tasksId }))
  }

  const changeTasksTitleHandler = (title: string) => {
    dispatch(updateTask({ todoId: tasksId, domainModel: { title }, taskId: id }))
  }
  const isTaskCompleted = isDone === TaskStatuses.Completed
  return (
    <ListItem disablePadding key={id} sx={getListItemSx(isTaskCompleted)}>
      <div>
        <Checkbox size="small" color="secondary" checked={isTaskCompleted} onChange={changeTasksStatusHandler} />
        <EditableSpan title={title} changeTitle={changeTasksTitleHandler} />
      </div>
      <IconButton onClick={removeTaskHandler} color="primary">
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </ListItem>
  )
}
