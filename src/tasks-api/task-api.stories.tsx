import {AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { taskApi } from './task-api';

export default {
  title: 'API',
};


export const GetTasks = () => {
  const todoId = 'ccb442d1-7fc6-46af-a856-054406d10a9d'
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    taskApi.getTasks(todoId)
        .then((res: AxiosResponse<any, any>)=>{
            console.log(res.data)
            setState(res.data)
        })
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
  const todoId = 'ccb442d1-7fc6-46af-a856-054406d10a9d'
  const [state, setState] = useState<any>(null);
  const title = "React for Task"
  useEffect(() => {
    taskApi.createTask(todoId, title)
        .then((res: AxiosResponse<any,any>)=> {
            setState(res.data)
        })
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const idTodolist = 'ccb442d1-7fc6-46af-a856-054406d10a9d'
  const taskId = '92266585-bc06-4847-bb8f-d5015b210375'
  useEffect(() => {
    taskApi.deleteTask(idTodolist, taskId)
        .then((res: AxiosResponse<any,any>)=> {
            setState(res.data)
        })
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null);
  const idTodolist = 'ccb442d1-7fc6-46af-a856-054406d10a9d'
  const taskId = '25c745b9-52b8-447b-8f7a-dfdac58cd7cf'
  const title = 'korshun'
  useEffect(() => {
    taskApi.updateTask(idTodolist, taskId, {title})
        .then((res: AxiosResponse<any,any>)=> {
            setState(res.data)
        })
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
