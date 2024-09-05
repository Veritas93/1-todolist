import { Reducer, useReducer, useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './addItemForm/AddItemForm';
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
} from './state/todolist-reducer';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './state/tasks-reducer';

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

function AppWithReducers() {
  //BLL
  // Global States
  const TaskId2 = v1();
  const TaskId1 = v1();
  const [todoList, dispatchToTodoList] = useReducer(todolistsReducer, [
    { id: TaskId1, title: 'What to learn', filter: 'all' },
    { id: TaskId2, title: 'What to do', filter: 'all' },
  ]);

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [TaskId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'Typescript', isDone: false },
      { id: v1(), title: 'RTK query', isDone: false },
    ],
    [TaskId2]: [
      { id: v1(), title: 'HW', isDone: true },
      { id: v1(), title: 'Exam', isDone: true },
      { id: v1(), title: 'Audio', isDone: false },
    ],
  });

  // Task CRUD
  const addTask = (taskID: string, title: string) => {
    const action = addTaskAC(title, taskID);
    dispatchToTasks(action);
  };

  const changeTasksStatus = (taskID: string, id: string, isDone: boolean) => {
    const action = changeTaskStatusAC(taskID, isDone, id);
    dispatchToTasks(action);
  };

  const changeTasksTitle = (taskID: string, id: string, title: string) => {
    const action = changeTaskTitleAC(id, title, taskID);
    dispatchToTasks(action);
  };

  const removeTask = (taskID: string, id: string) => {
    const action = removeTaskAC(id, taskID);
    dispatchToTasks(action);
  };

  // Todolist CRUD
  const addTodolist = (titleTodo: string) => {
    const action = AddTodolistActionCreator(titleTodo);
    dispatchToTodoList(action);
    dispatchToTasks(action);
  };

  const changeFilter = (tasksId: string, NewFilterValue: FilterType) => {
    const action = ChangeTodolistFilterAC(tasksId, NewFilterValue);
    dispatchToTodoList(action);
  };

  const changeTodolistTitle = (tasksId: string, NewTitleValue: string) => {
    const action = ChangeTodolistTitleAC(tasksId, NewTitleValue);
    dispatchToTodoList(action);
  };

  const removeTodolist = (taskID: string) => {
    const action = RemoveTodolistAC(taskID);
    dispatchToTodoList(action);
    dispatchToTasks(action);
  };
  //UI
  const todolistComp: Array<JSX.Element> = todoList.map((el) => {
    let filterTasksForTodolist: TaskType[] = tasks[el.id];
    if (el.filter === 'active') {
      filterTasksForTodolist = filterTasksForTodolist.filter((t) => !t.isDone);
    }
    if (el.filter === 'completed') {
      filterTasksForTodolist = filterTasksForTodolist.filter((t) => t.isDone);
    }

    return (
      <Grid item>
        <Paper sx={{ p: '20px 15px' }} elevation={8}>
          <Todolist
            key={el.id}
            tasksId={el.id}
            filter={el.filter}
            title={el.title}
            tasks={filterTasksForTodolist}
            date="30.01.2024"
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTasksStatus={changeTasksStatus}
            removeTodolist={removeTodolist}
            changeTasksTitle={changeTasksTitle}
            changeTodolistTitle={changeTodolistTitle}
          />
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

export default AppWithReducers;
