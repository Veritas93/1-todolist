import type { Meta, StoryObj } from "@storybook/react"
import { TaskItemWithRedux } from "./TaskItemWithRedux"
import { ReduxStoreProviderDecorator } from "../../lib/ReduxStoreProviderDecorator"
import { useSelector } from "react-redux"
import { AppRootStateType } from "../../../../app/model/store"
import { v1 } from "uuid"
import { TaskPriorities, TaskStatuses } from "features/todolist/lib/enums/enums"
import { Task } from "common/types/commonType"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof TaskItemWithRedux> = {
  title: "TASKS/TaskItemWithRedux",
  component: TaskItemWithRedux,
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
  // args: {
  //   tasksId: 'todolistId1',
  //   id: '21e12ecsdvsxvsfb',
  //   isDone: true,
  //   title: 'HTML&CSS',
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { addItem: fn() },
  decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof TaskItemWithRedux>

const TaskItem = () => {
  let task = useSelector<AppRootStateType, Task>((state) => state.tasks["todolistId1"][0])
  if (!task)
    task = {
      id: v1(),
      title: "DEFAULT TASK",
      status: TaskStatuses.Completed,
      description: "",
      completed: false,
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      todoListId: "todolistId1",
      order: 0,
      addedDate: "",
    }
  return <TaskItemWithRedux tasksId={"todolistId1"} id={task.id} isDone={task.status} title={task.title} />
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskItemWithReduxStory: Story = {
  render: () => <TaskItem />,
}
