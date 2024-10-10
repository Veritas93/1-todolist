import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AddItemForm, AddItemFormType } from './AddItemForm';
import { ChangeEvent, memo, useState, KeyboardEvent, } from 'react';
import { Box, Button, TextField } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import s from './../TodoList.module.css';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    addItem: {
      description: 'Button clicked inside form',
      action: 'clicked',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { addItem: fn() },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStories: Story = {};

const AddItemFormError = memo (({ addItem }: AddItemFormType) => {
  
  const [itemTitle, setItemTitle] = useState('');
  const [error, setError] = useState<string | null>('Title is required!');
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

export const AddItemFormErrorsStories: Story = {render: (args) => <AddItemFormError addItem={args.addItem}/>}