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
type TaskListType = {
  id: string;
  titleTask: string;
  filter: FilterType;
};

type TaskStateType = {
  [taskId: string]: TaskType[];
};

function App() {
  const TaskId2 = v1();
  const TaskId1 = v1();
  const [taskList, setTaskList] = useState<TaskListType[]>([
    { id: TaskId1, titleTask: "What to learn", filter: "all" },
    { id: TaskId2, titleTask: "What to do", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
    [TaskId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "Typescript", isDone: false },
      { id: v1(), title: "RTK query", isDone: false },
    ],
    [TaskId2]: [
      { id: v1(), title: "HW", isDone: true },
      { id: v1(), title: "Exam", isDone: true },
      { id: v1(), title: "Audio", isDone: false },
    ],
  });

  const changeTasksStatus = (taskID: string, id: string, isDone: boolean) => {
    setTasks({
      ...tasks,
      [taskID]: tasks[taskID].map((el) =>
        el.id === id ? { ...el, isDone: isDone } : el
      ),
    });
  };

  const removeTask = (taskID: string, id: string) => {
    setTasks({ ...tasks, [taskID]: tasks[taskID].filter((t) => t.id !== id) });
  };

  const changeFilter = (tasksId: string, NewFilterValue: FilterType) => {
    setTaskList(
      taskList.map((el) =>
        el.id === tasksId ? { ...el, filter: NewFilterValue } : el
      )
    );
  };
  const addTask = (taskID: string, title: string) => {
    const newTask: TaskType = { id: v1(), title: title, isDone: false };
    setTasks({ ...tasks, [taskID]: [newTask, ...tasks[taskID]] });
  };
  const removeTodolist = (taskID: string) => {
    setTaskList(taskList.filter((el) => el.id !== taskID));
    delete tasks[taskID];
  };

  //UI
  const todolistComp: Array<JSX.Element> = taskList.map((el) => {
    let filterTasksForTodolist: TaskType[] = tasks[el.id];
    if (el.filter === "active") {
      filterTasksForTodolist = filterTasksForTodolist.filter((t) => !t.isDone);
    }
    if (el.filter === "completed") {
      filterTasksForTodolist = filterTasksForTodolist.filter((t) => t.isDone);
    }
    return (
      <Todolist
        key={el.id}
        tasksId={el.id}
        filter={el.filter}
        title={el.titleTask}
        tasks={filterTasksForTodolist}
        date="30.01.2024"
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTasksStatus={changeTasksStatus}
        removeTodolist={removeTodolist}
      />
    );
  });
  return <div className="App">{todolistComp};</div>;
}

export default App;
