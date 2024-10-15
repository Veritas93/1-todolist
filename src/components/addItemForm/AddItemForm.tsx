import { memo } from "react"
import s from "./../../features/Todolist/TodoList.module.css"
import PostAddIcon from "@mui/icons-material/PostAdd"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import { useAddItemForm } from "./hooks/useAddItemForm"

export type AddItemFormType = {
  addItem: (newTitle: string) => void
  disabled?: boolean
}

export const AddItemForm = memo(({ addItem, disabled }: AddItemFormType) => {
  const {
    disableButton,
    error,
    changeItemTitle,
    keyDownAddItemHandler,
    isAddItemButtonDisable,
    itemTitle,
    addItemHandler,
  } = useAddItemForm(addItem)
  const userItemTitleLengthWarning = disableButton && <div className={s.error}>Your Item title is too long</div>
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          placeholder="Enter a title"
          size="small"
          className={error ? s.error : ""}
          value={itemTitle}
          onChange={changeItemTitle}
          onKeyDown={keyDownAddItemHandler}
          error={!!error}
          helperText={error && "Title is required!"}
          disabled={disabled}
        />
        <Button
          onClick={addItemHandler}
          variant="contained"
          sx={{ ml: "3px" }}
          startIcon={<PostAddIcon fontSize="small" />}
          disabled={isAddItemButtonDisable || disableButton || disabled}
          color="primary"
          size="small"
        >
          Add
        </Button>
      </Box>
      {userItemTitleLengthWarning}
    </div>
  )
})
