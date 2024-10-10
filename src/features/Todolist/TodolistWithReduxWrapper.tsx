import { TodolistWithRedux } from './TodolistWithRedux';
import { useAppWithRedux } from '../../appWithRedux/hooks/useAppWithRedux';
import { Grid, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { AddItemForm } from '../../components/addItemForm/AddItemForm';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setStatusAC } from '../../state/app-reducer';
import { getTodosTC } from '../../state/todolist/todolist-reducer';

//UI
export const TodolistWithReduxWrapper = () => {
  const { todoLists, addTodolist } = useAppWithRedux();
  const isLoggedIn = useAppSelector(i=> i.auth.isLoggedIn)

  
  if(!isLoggedIn) {
    return <Navigate to="/login"/>
  }

 
  return (
    <>
      <Grid container sx={{ p: '40px 0  10px 0' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      {todoLists.map((el) => {
        return (
          <Grid key={el.id} item>
            <Paper sx={{ p: '20px 15px' }} elevation={8}>
              <TodolistWithRedux todolist={el} />
            </Paper>
          </Grid>
        );
      })}
    </>
  );
};
