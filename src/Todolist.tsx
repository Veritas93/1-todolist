import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterType, TaskType } from "./App";
import { Button } from "./Button";
import s from "./TodoList.module.css";
import { TaskItem } from "./TaskItem";

export type TodolistPropsType = {
  tasksId: string;
  filter: FilterType;
  title: string;
  tasks: TaskType[];
  date?: string;

  removeTask: (taskID: string, id: string) => void;
  changeFilter: (tasksId: string, NewFilterValue: FilterType) => void;
  addTask: (taskID: string, title: string) => void;
  changeTasksStatus: (taskID: string, id: string, isDone: boolean) => void;
  removeTodolist: (taskID: string) => void;
};

export const Todolist = ({
  filter,
  tasksId,
  title,
  tasks,
  date,
  removeTask,
  changeFilter,
  addTask,
  changeTasksStatus,
  removeTodolist,
}: TodolistPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  // const [error, setError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [filter, setFilter] = useState<FilterType>("all");

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
    if (taskTitle.trim()) {
      addTask(tasksId, taskTitle.trim());
      setTaskTitle("");
    } else {
      setError("Title is required!");
    }
  };

  const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTaskTitle(e.currentTarget.value);
  };

  const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && addTaskHandler();

  const setAllTasksHandler = () => {
    changeFilter(tasksId, "all");
  };

  const setActiveTasksHandler = () => {
    changeFilter(tasksId, "active");
  };

  const setCompletedTasksHandler = () => {
    changeFilter(tasksId, "completed");
  };
  const isAddTaskButtonDisable = !taskTitle.trim();
  const userTaskTitleLengthWarning = taskTitle.length > 15 && (
    <div className={s.error}>Your task title is too long</div>
  );
  return (
    <div>
      <h3>
        {title}
        <Button
          title="x"
          onClickButtonHandler={() => removeTodolist(tasksId)}
        ></Button>
      </h3>
      <div>
        <input
          className={error ? s.error : ""}
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
        {/* <Button
          className={filter === "all" ? s.activeFilter : ""}
          title="All"
          onClickButtonHandler={setAllTasksHandler}
        />
        <Button
          className={filter === "active" ? s.activeFilter : ""}
          title="Active"
          onClickButtonHandler={setActiveTasksHandler}
        />
        <Button
          className={filter === "completed" ? s.activeFilter : ""}
          title="Completed"
          onClickButtonHandler={setCompletedTasksHandler}
        /> */}
        {/* 2 вариант  */}

        <Button
          filter={filter}
          title="all"
          onClickButtonHandler={setAllTasksHandler}
        />
        <Button
          filter={filter}
          title="active"
          onClickButtonHandler={setActiveTasksHandler}
        />
        <Button
          filter={filter}
          title="completed"
          onClickButtonHandler={setCompletedTasksHandler}
        />
      </div>
      <div>{date}</div>
    </div>
  );
};
