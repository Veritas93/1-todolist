import { TaskType } from "./App";

export const TaskItem = ({ id, isDone, title }: TaskType) => {
  return (
    <li key={id}>
      <input type="checkbox" checked={isDone} />
      <span>{title}</span>
    </li>
  );
};
