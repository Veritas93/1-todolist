import { TaskType } from "./App";
import { Button } from "./Button";
import { TaskItem } from "./TaskItem";

export type TodolistPropsType = {
  title: string;
  tasks: TaskType[];
  date?: string;
};

export const Todolist = ({ title, tasks, date }: TodolistPropsType) => {
  const TaskMap = tasks.map((task) => {
    return <TaskItem id={task.id} isDone={task.isDone} title={task.title} />;
  });
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title="+" />
      </div>
      {tasks.length === 0 ? <p>Тасок нет</p> : <ul>{TaskMap}</ul>}
      <div>
        <Button title="All" />
        <Button title="Active" />
        <Button title="Completed" />
      </div>
      <div>{date}</div>
    </div>
  );
};
