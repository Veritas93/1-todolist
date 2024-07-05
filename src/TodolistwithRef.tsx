import { useRef } from "react";
import { FilterType, TaskType } from "./App";
import { Button } from "./Button";

import { TaskItem } from "./TaskItem";

export type TodolistPropsType = {
  title: string;
  tasks: TaskType[];
  date?: string;
  removeTask: (id: string) => void;
  changeFilter: (NewFilterValue: FilterType) => void;
  addTask: (title: string) => void;
};

export const Todolist = ({
  title,
  tasks,
  date,
  removeTask,
  changeFilter,
  addTask,
}: TodolistPropsType) => {
  const taskInputRef = useRef<HTMLInputElement>(null);
  const TaskMap = tasks.map((task) => {
    return (
      <TaskItem
        id={task.id}
        isDone={task.isDone}
        title={task.title}
        removeTask={removeTask}
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
