import { ChangeEvent } from 'react';
import { Button } from './Button';
import s from './TodoList.module.css';
import { EditableSpan } from './EditableSpan';

type TaskItemType = {
  tasksId: string;
  id: string;
  isDone: boolean;
  title: string;
  removeTask: (taskID: string, id: string) => void;
  changeTasksStatus: (taskID: string, id: string, isDone: boolean) => void;
  changeTasksTitle: (taskID: string, id: string, title: string) => void;
};

export const TaskItem = ({
  tasksId,
  id,
  isDone,
  title,
  removeTask,
  changeTasksStatus,
  changeTasksTitle,
}: TaskItemType) => {
  const changeTasksStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeTasksStatus(tasksId, id, e.currentTarget.checked);
  };
  const removeTaskHandler = () => {
    removeTask(tasksId, id);
  };

  const changeTasksTitleCallback = (newTitle: string) => {
    changeTasksTitle(tasksId, id, newTitle);
  };
  return (
    <li key={id} className={isDone ? s.isDone : ''}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={changeTasksStatusHandler}
      />
      <EditableSpan title={title} changeTitle={changeTasksTitleCallback} />
      <Button onClickButtonHandler={removeTaskHandler} title="x" />
    </li>
  );
};
