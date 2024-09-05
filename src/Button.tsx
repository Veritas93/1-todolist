import { memo, useCallback } from 'react';
import { FilterType } from './App';
import s from './TodoList.module.css';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { ChangeTodolistFilterAC } from './state/todolist-reducer';

type ButtonPropsType = {
  title: string;
  color: 'primary' | 'secondary';
  onClick: () => void;
};

export const ButtonWrapper = memo(
  ({ color, title, onClick }: ButtonPropsType) => {
    console.log('button');
    return (
      <Button
        size="small"
        variant="contained"
        disableElevation
        color={color}
        onClick={onClick}
      >
        {title}
      </Button>
    );
  }
);
