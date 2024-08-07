import { v1 } from 'uuid';
import { FilterType, TodoListType } from '../App';

type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  payload: {
    title: string;
    id: string;
  };
};

type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  payload: {
    id: string;
  };
};

type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER';
  payload: {
    id: string;
    filter: FilterType;
  };
};

type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE';
  payload: {
    id: string;
    title: string;
  };
};

export type ActionsType =
  | AddTodolistActionType
  | RemoveTodolistActionType
  | ChangeTodolistFilterActionType
  | ChangeTodolistTitleActionType;

export const todolistsReducer = (
  todolists: Array<TodoListType>,
  action: ActionsType
): Array<TodoListType> => {
  switch (action.type) {
    case 'ADD-TODOLIST': {
      const { title, id } = action.payload;
      return [
        {
          id,
          title: title,
          filter: 'all',
        },
        ...todolists,
      ];
    }
    case 'REMOVE-TODOLIST': {
      const { id } = action.payload;
      return todolists.filter((el) => el.id !== id);
    }

    case 'CHANGE-TODOLIST-FILTER': {
      const { id, filter } = action.payload;
      return todolists.map((el) =>
        el.id === id ? { ...el, filter: filter } : el
      );
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const { id, title } = action.payload;
      return todolists.map((el) =>
        el.id === id ? { ...el, title: title } : el
      );
    }
    default:
      return todolists;
  }
};

export const AddTodolistActionCreator = (
  id: string,
  title: string
): AddTodolistActionType => ({
  type: 'ADD-TODOLIST',
  payload: { id, title },
});

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => ({
  type: 'REMOVE-TODOLIST',
  payload: { id },
});

export const ChangeTodolistFilterAC = (
  id: string,
  filter: FilterType
): ChangeTodolistFilterActionType => ({
  type: 'CHANGE-TODOLIST-FILTER',
  payload: { id, filter },
});

export const ChangeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => ({
  type: 'CHANGE-TODOLIST-TITLE',
  payload: { id, title },
});
