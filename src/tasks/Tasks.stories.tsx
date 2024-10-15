import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { TaskItem } from "./TaskItem"
import { useState } from "react"
import { action } from "@storybook/addon-actions"
import { TaskStatuses } from "../state/task/tasksSlice"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof TaskItem> = {
  title: "TASKS/TaskItem",
  component: TaskItem,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   removeTask: {
  //     action: 'clicked',
  //   },
  // },
  args: {
    tasksId: "vsdvser23232sczcxq",
    id: "21e12ecsdvsxvsfb",
    isDone: TaskStatuses.Completed,
    title: "CSS",
    removeTask: fn(),
    // changeTasksStatus: fn(),
    // changeTasksTitle: fn(),
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { addItem: fn() },
}

export default meta
type Story = StoryObj<typeof TaskItem>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskIsNotDoneStory: Story = {
  args: {
    id: "21e12ecsdvsxvsfb",
    isDone: TaskStatuses.New,
    title: "JS",
  },
}

export const TaskIsDoneStory: Story = {}

const ToggleTask = () => {
  const [task, setTask] = useState({
    id: "21e12ecsdvsxvsfb",
    isDone: TaskStatuses.New,
    title: "JS",
  })
  const changeTasksStatus = () => {
    setTask({ ...task, isDone: TaskStatuses.Completed })
  }

  const changeTasksTitle = (taskID: string, id: string, title: string) => {
    setTask({ ...task, title: title })
  }
  return (
    <TaskItem
      tasksId={"sdvcsvsd533443gf"}
      id={task.id}
      isDone={task.isDone}
      title={task.title}
      removeTask={action("removeTask")}
      changeTasksStatus={changeTasksStatus}
      changeTasksTitle={changeTasksTitle}
    />
  )
}
export const ToggleTaskStory: Story = {
  render: () => <ToggleTask />,
}
// export const AddItemFormErrorsStories: Story = {render: (args) => <AddItemFormError addItem={args.addItem}/>}
