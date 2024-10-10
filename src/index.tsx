import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithRedux from './appWithRedux/AppWithRedux';
import { Provider } from 'react-redux';
import { store } from './state/store';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { Login } from './features/Login/Login';
import { TodolistWithReduxWrapper } from './features/Todolist/TodolistWithReduxWrapper';
import { ErrorPage } from './components/ErrorPage/ErrorPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppWithRedux />,
    errorElement: <Navigate to={'/404'} />,
    children: [
      {
        index: true,
        element: <Navigate to={'/todolists'} />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/todolists',
        element: <TodolistWithReduxWrapper />,
      },
    ],
  },
  {
    path: '/404',
    element: <ErrorPage />,
  },
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
