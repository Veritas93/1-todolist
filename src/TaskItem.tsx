import { TaskType } from "./App";
import { Button } from "./Button";

type TaskItemType = {
  id: string;
  isDone: boolean;
  title: string;
  removeTask: (id: string) => void;
};

export const TaskItem = ({ id, isDone, title, removeTask }: TaskItemType) => {
  return (
    <li key={id}>
      <input type="checkbox" checked={isDone} />
      <span>{title}</span>
      <Button onClickButtonHandler={() => removeTask(id)} title="x" />
    </li>
  );
};
