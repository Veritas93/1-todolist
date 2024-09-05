import { TaskStateType, TaskType, TodoListType } from './App';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TaskItem } from './tasks/TaskItem';
import { AddItemForm } from './addItemForm/AddItemForm';
import { EditableSpan } from './editableSpan/EditableSpan';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { buttonsContainerSx } from './Todolist.Styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { addTaskAC } from './state/tasks-reducer';
import {
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
} from './state/todolist-reducer';
import { TaskItemWithRedux } from './tasks/TaskItemWithRedux';
import { memo, useCallback, useMemo } from 'react';
import { ButtonWrapper } from './Button';

export type TodolistPropsType = {
  todolist: TodoListType;
};

export const TodolistWithRedux = memo(({ todolist }: TodolistPropsType) => {
  console.log('TodolistWithRedux');
  let date = '30.01.2024';
  const { id, title, filter } = todolist;
  let tasks = useSelector<AppRootStateType, TaskType[]>(
    (state) => state.tasks[id]
  );

  const dispatch = useDispatch();

  const TaskMap = tasks.map((task) => {
    return (
      <TaskItemWithRedux
        key={task.id}
        tasksId={id}
        id={task.id}
        isDone={task.isDone}
        title={task.title}
      />
    );
  });

  const addItemCallback = useCallback(
    (taskTitle: string) => {
      dispatch(addTaskAC(taskTitle, id));
    },
    [id]
  );

  const changeTodolistTitleCallback = useCallback(
    (newTitle: string) => {
      dispatch(ChangeTodolistTitleAC(id, newTitle));
    },
    [dispatch]
  );

  const setAllTasksHandler = useCallback(() => {
    dispatch(ChangeTodolistFilterAC(id, 'all'));
  }, [dispatch]);

  const setActiveTasksHandler = useCallback(() => {
    dispatch(ChangeTodolistFilterAC(id, 'active'));
  }, [dispatch]);

  const setCompletedTasksHandler = useCallback(() => {
    dispatch(ChangeTodolistFilterAC(id, 'completed'));
  }, [dispatch]);

  tasks = useMemo(() => {
    console.log('useMemo');
    if (filter === 'active') {
      tasks = tasks.filter((t) => !t.isDone);
    }
    if (filter === 'completed') {
      tasks = tasks.filter((t) => t.isDone);
    }
    return tasks;
  }, [tasks, filter]);

  return (
    <div>
      <h3>
        <EditableSpan title={title} changeTitle={changeTodolistTitleCallback} />
        <IconButton
          onClick={() => dispatch(RemoveTodolistAC(id))}
          color="primary"
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </h3>
      <AddItemForm addItem={addItemCallback} />
      {tasks.length === 0 ? <p>Тасок нет</p> : <List>{TaskMap}</List>}
      <Box sx={buttonsContainerSx}>
        <ButtonWrapper
          title={'all'}
          color={filter === 'all' ? 'secondary' : 'primary'}
          onClick={setAllTasksHandler}
        />
        <ButtonWrapper
          title={'active'}
          color={filter === 'active' ? 'secondary' : 'primary'}
          onClick={setActiveTasksHandler}
        />
        <ButtonWrapper
          title={'completed'}
          color={filter === 'completed' ? 'secondary' : 'primary'}
          onClick={setCompletedTasksHandler}
        />
      </Box>
      <div>{date}</div>
    </div>
  );
});
