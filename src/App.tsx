import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
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

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterType = 'all' | 'active' | 'completed';
type TodoListType = {
  id: string;
  titleTodo: string;
  filter: FilterType;
};

type TaskStateType = {
  [taskId: string]: TaskType[];
};

function App() {
  const TaskId2 = v1();
  const TaskId1 = v1();
  const [todoList, setTodoList] = useState<TodoListType[]>([
    { id: TaskId1, titleTodo: 'What to learn', filter: 'all' },
    { id: TaskId2, titleTodo: 'What to do', filter: 'all' },
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
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
    const newTask: TaskType = { id: v1(), title: title, isDone: false };
    setTasks({ ...tasks, [taskID]: [newTask, ...tasks[taskID]] });
  };

  const changeTasksStatus = (taskID: string, id: string, isDone: boolean) => {
    setTasks({
      ...tasks,
      [taskID]: tasks[taskID].map((el) =>
        el.id === id ? { ...el, isDone: isDone } : el
      ),
    });
  };

  const changeTasksTitle = (taskID: string, id: string, title: string) => {
    setTasks({
      ...tasks,
      [taskID]: tasks[taskID].map((el) =>
        el.id === id ? { ...el, title: title } : el
      ),
    });
  };

  const removeTask = (taskID: string, id: string) => {
    setTasks({ ...tasks, [taskID]: tasks[taskID].filter((t) => t.id !== id) });
  };

  // Todolist CRUD
  const addTodolist = (titleTodo: string) => {
    const TaskIdN = v1();
    const newTodo: TodoListType = {
      id: TaskIdN,
      titleTodo: titleTodo,
      filter: 'all',
    };
    const nextState: Array<TodoListType> = [...todoList, newTodo];
    setTodoList(nextState);
    setTasks({ ...tasks, [TaskIdN]: [] });
  };

  const changeFilter = (tasksId: string, NewFilterValue: FilterType) => {
    setTodoList(
      todoList.map((el) =>
        el.id === tasksId ? { ...el, filter: NewFilterValue } : el
      )
    );
  };

  const changeTodolistTitle = (tasksId: string, NewTitleValue: string) => {
    setTodoList(
      todoList.map((el) =>
        el.id === tasksId ? { ...el, titleTodo: NewTitleValue } : el
      )
    );
  };

  const removeTodolist = (taskID: string) => {
    setTodoList(todoList.filter((el) => el.id !== taskID));
    delete tasks[taskID];
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
            title={el.titleTodo}
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
          <Toolbar>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <MenuButton>Login</MenuButton>
            <MenuButton>Logout</MenuButton>
            <MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
            <Switch color="secondary" onChange={() => setIsLight(!isLight)} />
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

export default App;
