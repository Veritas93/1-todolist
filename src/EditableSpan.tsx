import { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
  title: string;
  changeTitle: (newTitle: string) => void;
};

export const EditableSpan = ({ title, changeTitle }: EditableSpanPropsType) => {
  const [itemTitle, setItemTitle] = useState(title);
  const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value);
  };

  const [editMod, setEditMod] = useState(false);
  const onEditMode = () => setEditMod(true);
  const offEditMode = () => {
    changeTitle(itemTitle);
    setEditMod(false);
  };
  return editMod ? (
    <input
      value={itemTitle}
      autoFocus
      onBlur={offEditMode}
      onChange={changeItemTitleHandler}
    />
  ) : (
    <span onDoubleClick={onEditMode}>{title}</span>
  );
};
