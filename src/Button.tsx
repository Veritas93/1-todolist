import { memo } from 'react';
import s from './TodoList.module.css';
import Button from '@mui/material/Button';

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
