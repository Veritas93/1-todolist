import { FilterType } from "./App";
import s from "./TodoList.module.css";

type ButtonPropsType = {
  title: string;
  onClickButtonHandler?: () => void;
  disabled?: boolean;
  className?: string;
  filter?: FilterType;
};

export const Button = ({
  title,
  onClickButtonHandler,
  disabled,
  filter,
}: ButtonPropsType) => {
  return (
    <button
      disabled={disabled}
      className={filter === title ? s.activeFilter : ""}
      onClick={onClickButtonHandler}
    >
      {title}
    </button>
  );
};
