import { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterType = "all" | "active" | "completed";

function App() {
  const [filter, setFilter] = useState<FilterType>("all");

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Typescript", isDone: false },
    { id: v1(), title: "RTK query", isDone: false },
  ]);

  const removeTask = (id: string) => {
    const NewTasks = tasks.filter((t) => t.id !== id);
    setTasks(NewTasks);
  };

  const addTask = (title: string) => {
    const newTask: TaskType = { id: v1(), title: title, isDone: false };
    setTasks([newTask, ...tasks]);
  };

  let filterTasksForTodollist: TaskType[] = tasks;

  if (filter === "active") {
    filterTasksForTodollist = tasks.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    filterTasksForTodollist = tasks.filter((t) => t.isDone);
  }
  const changeFilter = (NewFilterValue: FilterType) => {
    setFilter(NewFilterValue);
  };
  return (
    <>
      <Todolist
        title="What to learn"
        tasks={filterTasksForTodollist}
        date="30.01.2024"
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
      {/* <Todolist title="Songs" tasks={tasks2} /> */}
    </>
  );
}

export default App;
