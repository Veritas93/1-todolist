import { ChangeEvent, useState, KeyboardEvent } from "react"

export const useAddItemForm = (addItem: (newTitle: string) => void) => {
  const [itemTitle, setItemTitle] = useState("")
  const [error, setError] = useState<string | null>(null)
  const disableButton = itemTitle.length > 15

  const isAddItemButtonDisable = !itemTitle.trim()

  const changeItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setItemTitle(e.currentTarget.value)
  }
  const keyDownAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addItemHandler()
  const addItemHandler = () => {
    if (itemTitle.trim()) {
      addItem(itemTitle.trim())
      setItemTitle("")
    } else {
      setError("Title is required!")
    }
  }
  return {
    disableButton,
    error,
    changeItemTitle,
    keyDownAddItemHandler,
    isAddItemButtonDisable,
    itemTitle,
    addItemHandler,
  }
}
