import { Button } from './Button';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import s from './TodoList.module.css';

type AddItemFormType = {
  addItem: (newTitle: string) => void;
};

export const AddItemForm = ({ addItem }: AddItemFormType) => {
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
      <input
        className={error ? s.error : ''}
        value={itemTitle}
        onChange={changeItemTitle}
        onKeyDown={keyDownAddItemHandler}
      />
      <Button
        title="+"
        onClickButtonHandler={addItemHandler}
        disabled={isAddItemButtonDisable || disableButton}
      />
      {userItemTitleLengthWarning}
    </div>
  );
};
