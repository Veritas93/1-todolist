import { ChangeEvent } from "react";
import { Button } from "./Button";
import s from "./TodoList.module.css";

type TaskItemType = {
  tasksId: string;
  id: string;
  isDone: boolean;
  title: string;
  removeTask: (taskID: string, id: string) => void;
  changeTasksStatus: (taskID: string, id: string, isDone: boolean) => void;
};

export const TaskItem = ({
  tasksId,
  id,
  isDone,
  title,
  removeTask,
  changeTasksStatus,
}: TaskItemType) => {
  const changeTasksStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeTasksStatus(tasksId, id, e.currentTarget.checked);
  };
  const removeTaskHandler = () => {
    removeTask(tasksId, id);
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
