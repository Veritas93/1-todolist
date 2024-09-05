import { ChangeEvent, useState, KeyboardEvent, memo } from 'react';
import s from './../TodoList.module.css';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export type AddItemFormType = {
  addItem: (newTitle: string) => void;
};

export const AddItemForm = memo (({ addItem }: AddItemFormType) => {
  
  const [itemTitle, setItemTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const disableButton = itemTitle.length > 15;
  const userItemTitleLengthWarning = disableButton && (
    <div className={s.error}>Your Item title is too long</div>
  );

  const isAddItemButtonDisable = !itemTitle.trim();

  const changeItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setItemTitle(e.currentTarget.value);
  };
  const keyDownAddItemHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === 'Enter' && addItemHandler();
  const addItemHandler = () => {
    if (itemTitle.trim()) {
      addItem(itemTitle.trim());
      setItemTitle('');
    } else {
      setError('Title is required!');
    }
  };
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          placeholder="Enter a title"
          size="small"
          className={error ? s.error : ''}
          value={itemTitle}
          onChange={changeItemTitle}
          onKeyDown={keyDownAddItemHandler}
          error={!!error}
          helperText={error && 'Title is required!'}
        />
        <Button
          onClick={addItemHandler}
          variant="contained"
          sx={{ ml: '3px' }}
          startIcon={<PostAddIcon fontSize="small" />}
          disabled={isAddItemButtonDisable || disableButton}
          color="primary"
          size="small"
        >
          Add
        </Button>
      </Box>
      {userItemTitleLengthWarning}
    </div>
  );
});
