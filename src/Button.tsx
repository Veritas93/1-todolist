import { ButtonHTMLAttributes } from "react";

type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ title }: ButtonPropsType) => {
  return <button>{title}</button>;
};
