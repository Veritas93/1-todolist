import { ButtonHTMLAttributes } from "react";

type ButtonPropsType = {
  title: string;
  onClickButtonHandler?: () => void;
  disabled?: boolean;
};

export const Button = ({
  title,
  onClickButtonHandler,
  disabled,
}: ButtonPropsType) => {
  return (
    <button disabled={disabled} onClick={onClickButtonHandler}>
      {title}
    </button>
  );
};
