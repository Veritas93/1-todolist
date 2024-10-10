import {AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { todolistApi } from './todolist-api';

export default {
  title: 'API',
};


export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistApi.getTodolist()
        .then((res: AxiosResponse<any, any>)=>{
            console.log(res.data)
            setState(res.data)
        })
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const title = "React"
  useEffect(() => {
    todolistApi.createTodolist(title)
        .then((res: AxiosResponse<any,any>)=> {
            setState(res.data)
        })
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const idTodolist = 'b021a94a-6e65-44ce-bfe5-eb1daa64be0d'
  useEffect(() => {
    todolistApi.deleteTodolist(idTodolist)
        .then((res: AxiosResponse<any,any>)=> {
            setState(res.data)
        })
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const idTodolist = 'ccb442d1-7fc6-46af-a856-054406d10a9d'
  const title = 'REDUX'
  useEffect(() => {
    todolistApi.updateTodolist(idTodolist, title)
        .then((res: AxiosResponse<any,any>)=> {
            setState(res.data)
        })
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
