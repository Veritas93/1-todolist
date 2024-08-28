import { useCallback, useReducer, useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { MenuButton } from './MenuButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { amber, green } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import {
  AddTodolistActionCreator,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistsReducer,
} from './reducers/todolist-reducer';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './reducers/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './reducers/store';
import { TodolistWithRedux } from './TodolistWithRedux';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterType = 'all' | 'active' | 'completed';
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TaskStateType = {
  [taskId: string]: TaskType[];
};

function AppWithRedux() {
  //BLL
  // Global States
  const TaskId2 = v1();
  const TaskId1 = v1();

  const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(
    (state) => state.todolists
  );
  // const tasks = useSelector<AppRootStateType, TaskStateType>(
  //   (state) => state.tasks
  // );

  const dispatch = useDispatch();

  // Task CRUD
  const addTask = useCallback((taskID: string, title: string) => {
    const action = addTaskAC(title, taskID);
    dispatch(action);
  },[dispatch]);

  const changeTasksStatus = useCallback( (taskID: string, id: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC(taskID, isDone, id));
  },[dispatch]);

  const changeTasksTitle = useCallback((taskID: string, id: string, title: string) => {
    dispatch(changeTaskTitleAC(id, title, taskID));
  },[dispatch]);

  const removeTask = useCallback((taskID: string, id: string) => {
    dispatch(removeTaskAC(id, taskID));
  },[dispatch]);

  // Todolist CRUD
  const addTodolist = useCallback((titleTodo: string) => {
    dispatch(AddTodolistActionCreator(titleTodo));
  },[dispatch]);

  const changeFilter = useCallback((tasksId: string, NewFilterValue: FilterType) => {
    dispatch(ChangeTodolistFilterAC(tasksId, NewFilterValue));
  },[dispatch]);

  const changeTodolistTitle = useCallback( (tasksId: string, NewTitleValue: string) => {
    dispatch(ChangeTodolistTitleAC(tasksId, NewTitleValue));
  },[dispatch]);

  const removeTodolist = useCallback((taskID: string) => {
    dispatch(RemoveTodolistAC(taskID));
  },[dispatch]);
  //UI
  const todolistComp: Array<JSX.Element> = todoLists.map((el) => {
    // let filterTasksForTodolist: TaskType[] = tasks[el.id];
    // if (el.filter === 'active') {
    //   filterTasksForTodolist = filterTasksForTodolist.filter((t) => !t.isDone);
    // }
    // if (el.filter === 'completed') {
    //   filterTasksForTodolist = filterTasksForTodolist.filter((t) => t.isDone);
    // }

    return (
      <Grid key={el.id} item>
        <Paper sx={{ p: '20px 15px' }} elevation={8}>
          <TodolistWithRedux todolist={el} />
        </Paper>
      </Grid>
    );
  });
  const [isLight, setIsLight] = useState(true);
  const theme = createTheme({
    palette: {
      primary: green,
      secondary: amber,
      mode: isLight ? 'light' : 'dark',
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <div>
              <MenuButton>Login</MenuButton>
              <MenuButton>Logout</MenuButton>
              <MenuButton background={theme.palette.primary.dark}>
                FAQ
              </MenuButton>
              <Switch color="secondary" onChange={() => setIsLight(!isLight)} />
            </div>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid container sx={{ p: '10px 0' }}>
            <AddItemForm addItem={addTodolist} />
          </Grid>
          <Grid container spacing={4}>
            {todolistComp}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default AppWithRedux;
