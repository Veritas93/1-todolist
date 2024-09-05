import { ChangeEvent, useCallback } from 'react';
import { EditableSpan } from '../editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import { getListItemSx } from '../Todolist.Styles';
import { useDispatch } from 'react-redux';
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../state/tasks-reducer';

type TaskItemType = {
  tasksId: string;
  id: string;
  isDone: boolean;
  title: string;
};

export const TaskItemWithRedux = ({
  tasksId,
  id,
  isDone,
  title,
}: TaskItemType) => {
  console.log('Task');
  const dispatch = useDispatch();
  const changeTasksStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeTaskStatusAC(id, e.currentTarget.checked, tasksId));
    },
    [dispatch]
  );
  const removeTaskHandler = useCallback(() => {
    dispatch(removeTaskAC(id, tasksId));
  }, [dispatch]);

  const changeTasksTitleCallback = useCallback(
    (newTitle: string) => {
      dispatch(changeTaskTitleAC(id, newTitle, tasksId));
    },
    [dispatch]
  );
  return (
    <ListItem disablePadding key={id} sx={getListItemSx(isDone)}>
      <div>
        <Checkbox
          size="small"
          color="secondary"
          checked={isDone}
          onChange={changeTasksStatusHandler}
        />
        <EditableSpan title={title} changeTitle={changeTasksTitleCallback} />
      </div>
      <IconButton onClick={removeTaskHandler} color="primary">
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </ListItem>
  );
};
