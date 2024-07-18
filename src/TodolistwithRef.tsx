import { useRef } from "react";
import { FilterType, TaskType } from "./App";
import { Button } from "./Button";

import { TaskItem } from "./TaskItem";

export type TodolistPropsType = {
  tasksId: string;
  title: string;
  tasks: TaskType[];
  date?: string;
  removeTask: (id: string) => void;
  changeFilter: (NewFilterValue: FilterType) => void;
  addTask: (title: string) => void;
  changeTasksStatus: (taskID: string, id: string, isDone: boolean) => void;
};

const TodolistRef = ({
  tasksId,
  title,
  tasks,
  date,
  removeTask,
  changeFilter,
  addTask,
  changeTasksStatus,
}: TodolistPropsType) => {
  const taskInputRef = useRef<HTMLInputElement>(null);
  const TaskMap = tasks.map((task) => {
    return (
      <TaskItem
        tasksId={tasksId}
        id={task.id}
        isDone={task.isDone}
        title={task.title}
        removeTask={removeTask}
        changeTasksStatus={changeTasksStatus}
      />
    );
  });

  const addTaskHandler = () => {
    if (taskInputRef.current) {
      addTask(taskInputRef.current.value);
      taskInputRef.current.value = "";
    }
  };
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input ref={taskInputRef} />
        <Button title="+" onClickButtonHandler={addTaskHandler} />
      </div>
      {tasks.length === 0 ? <p>Тасок нет</p> : <ul>{TaskMap}</ul>}
      <div>
        <Button title="All" onClickButtonHandler={() => changeFilter("all")} />
        <Button
          title="Active"
          onClickButtonHandler={() => changeFilter("active")}
        />
        <Button
          title="Completed"
          onClickButtonHandler={() => changeFilter("completed")}
        />
      </div>
      <div>{date}</div>
    </div>
  );
};
