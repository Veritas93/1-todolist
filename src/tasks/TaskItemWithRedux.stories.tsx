import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { TaskItemWithRedux } from './TaskItemWithRedux';
import { ReduxStoreProviderDecorator } from '../state/ReduxStoreProviderDecorator';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { TaskType } from '../App';
import { v1 } from 'uuid';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof TaskItemWithRedux> = {
  title: 'TASKS/TaskItemWithRedux',
  component: TaskItemWithRedux,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   removeTask: {
  //     action: 'clicked',
  //   },
  // },
  // args: {
  //   tasksId: 'todolistId1',
  //   id: '21e12ecsdvsxvsfb',
  //   isDone: true,
  //   title: 'HTML&CSS',
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { addItem: fn() },
  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof TaskItemWithRedux>;

const TaskItem = () => {
  let task = useSelector<AppRootStateType, TaskType>(
    (state) => state.tasks['todolistId1'][0]
  );
  if (!task) task = {id: v1(), title: "DEFAULT TASK", isDone: false}
  return (
    <TaskItemWithRedux
      tasksId={'todolistId1'}
      id={task.id}
      isDone={task.isDone}
      title={task.title}
    />
  );
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskItemWithReduxStory: Story = {
  render: () => <TaskItem />,
};
