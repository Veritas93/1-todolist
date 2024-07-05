import { ChangeEvent, useState, KeyboardEvent } from "react";
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
  const [taskTitle, setTaskTitle] = useState("");

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
    addTask(taskTitle);
    setTaskTitle("");
  };

  const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };

  const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && addTaskHandler();

  const setAllTasksHandler = () => {
    changeFilter("all");
  };

  const setActiveTasksHandler = () => {
    changeFilter("active");
  };

  const setCompletedTasksHandler = () => {
    changeFilter("completed");
  };
  const isAddTaskButtonDisable = !taskTitle.trim();
  const userTaskTitleLengthWarning = taskTitle.length > 15 && (
    <div>Your task title is too long</div>
  );
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={changeTaskTitle}
          onKeyDown={keyDownAddTaskHandler}
        />
        <Button
          title="+"
          onClickButtonHandler={addTaskHandler}
          disabled={isAddTaskButtonDisable}
        />
        {userTaskTitleLengthWarning}
      </div>
      {tasks.length === 0 ? <p>Тасок нет</p> : <ul>{TaskMap}</ul>}
      <div>
        <Button title="All" onClickButtonHandler={setAllTasksHandler} />
        <Button title="Active" onClickButtonHandler={setActiveTasksHandler} />
        <Button
          title="Completed"
          onClickButtonHandler={setCompletedTasksHandler}
        />
      </div>
      <div>{date}</div>
    </div>
  );
};
