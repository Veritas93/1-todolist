import { useAppDispatch } from "app/model/store"
import { ButtonWrapper } from "common/components/button/Button"
import { FilterValues } from "common/types/commonType"
import { ChangeTodolistFilter } from "features/todolist/model/todolistSlice"

type Props = {
    filter: FilterValues ,
    id: string
}

export const FilterTaskButtons = ({id, filter}: Props) => {
    const dispatch = useAppDispatch()

    const changeTodolistFilterHandler = (filter: FilterValues) => {
        dispatch(ChangeTodolistFilter({ id, filter}))
    }

  return (
    <>
      <ButtonWrapper 
        title={"all"} 
        color={filter === "all" ? "secondary" : "primary"} 
        onClick={()=>changeTodolistFilterHandler("all")} />
      <ButtonWrapper
        title={"active"}
        color={filter === "active" ? "secondary" : "primary"}
        onClick={()=>changeTodolistFilterHandler("active")}
      />
      <ButtonWrapper
        title={"completed"}
        color={filter === "completed" ? "secondary" : "primary"}
        onClick={()=>changeTodolistFilterHandler("completed")}
      />
    </>
  )
}
