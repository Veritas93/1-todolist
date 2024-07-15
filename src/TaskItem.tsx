import { ChangeEvent } from "react";
import { Button } from "./Button";
import s from "./TodoList.module.css";

type TaskItemType = {
  id: string;
  isDone: boolean;
  title: string;
  removeTask: (id: string) => void;
  changeTasksStatus: (taskID: string, isDone: boolean) => void;
};

export const TaskItem = ({
  id,
  isDone,
  title,
  removeTask,
  changeTasksStatus,
}: TaskItemType) => {
  const changeTasksStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeTasksStatus(id, e.currentTarget.checked);
  };
  const removeTaskHandler = () => {
    removeTask(id);
  };
  return (
    <li key={id} className={isDone ? s.isDone : ""}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={changeTasksStatusHandler}
      />
      <span>{title}</span>
      <Button onClickButtonHandler={removeTaskHandler} title="x" />
    </li>
  );
};
