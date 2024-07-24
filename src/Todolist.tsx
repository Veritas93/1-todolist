import { FilterType, TaskType } from './App';
import { Button } from './Button';
import { TaskItem } from './TaskItem';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

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
  changeTasksTitle: (taskID: string, id: string, title: string) => void;
  changeTodolistTitle: (taskID: string, title: string) => void;
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
  changeTasksTitle,
  changeTodolistTitle,
}: TodolistPropsType) => {
  const TaskMap = tasks.map((task) => {
    return (
      <TaskItem
        tasksId={tasksId}
        id={task.id}
        isDone={task.isDone}
        title={task.title}
        removeTask={removeTask}
        changeTasksStatus={changeTasksStatus}
        changeTasksTitle={changeTasksTitle}
      />
    );
  });

  const addItemCallback = (taskTitle: string) => {
    addTask(tasksId, taskTitle);
  };

  const changeTodolistTitleCallback = (newTitle: string) => {
    changeTodolistTitle(tasksId, newTitle);
  };

  const setAllTasksHandler = () => {
    changeFilter(tasksId, 'all');
  };

  const setActiveTasksHandler = () => {
    changeFilter(tasksId, 'active');
  };

  const setCompletedTasksHandler = () => {
    changeFilter(tasksId, 'completed');
  };
  return (
    <div>
      <h3>
        <EditableSpan title={title} changeTitle={changeTodolistTitleCallback} />
        <Button
          title="x"
          onClickButtonHandler={() => removeTodolist(tasksId)}
        ></Button>
      </h3>
      <AddItemForm addItem={addItemCallback} />
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
