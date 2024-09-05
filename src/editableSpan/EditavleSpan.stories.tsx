import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { EditableSpan } from './EditableSpan';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof EditableSpan> = {
  title: 'EDITABLESPAN/EditableSpan',
  component: EditableSpan,
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
  args: {
    title: 'Homework',
    changeTitle: fn(),
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { addItem: fn() },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const EditableSpanStory: Story = {};

const ToggleEditableSpan = () => {
  const [title, setTitle] = useState('Homework')
  const changeTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <EditableSpan
    title={title}
    changeTitle={changeTitle}
    />
  );
  }
export const ToggleEditableSpanStory: Story = {
  render: () => <ToggleEditableSpan />,
};
// // export const AddItemFormErrorsStories: Story = {render: (args) => <AddItemFormError addItem={args.addItem}/>}
