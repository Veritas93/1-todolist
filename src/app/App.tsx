import { useState } from 'react';
import { Todolist } from '../features/Todolist/Todolist';
import { AddItemForm } from '../components/addItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { MenuButton } from './../MenuButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { amber, green } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { useTodolist } from './hooks/useTodolist';
import { useTasks } from './hooks/useTasks';
import { TaskType } from '../state/task/tasks-reducer';

export type TaskStateType = {
  [taskId: string]: TaskType[];
};

function App() {
  //BLL
  // Global States
  // Task hook CRUD
  const {
    tasks,
    addTask,
    changeTasksStatus,
    changeTasksTitle,
    removeTask,
    completeRemoveTasksForTodolist,
    addTasksForTodolist,
  } = useTasks();

  // Todolist hook CRUD
  const {
    todoList,
    addTodolist,
    changeFilter,
    changeTodolistTitle,
    removeTodolist,
  } = useTodolist(completeRemoveTasksForTodolist, addTasksForTodolist);

  //UI
  const todolistComp: Array<JSX.Element> = todoList.map((el) => {
    let filterTasksForTodolist: TaskType[] = tasks[el.id];
    if (el.filter === 'active') {
      filterTasksForTodolist = filterTasksForTodolist.filter((t) => !t.status);
    }
    if (el.filter === 'completed') {
      filterTasksForTodolist = filterTasksForTodolist.filter((t) => t.status);
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

export default App;
