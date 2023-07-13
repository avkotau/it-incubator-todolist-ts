import type { Meta, StoryObj } from '@storybook/react';
import { TaskType } from "../AppWithRedux";

import { ReduxStoreProviderDecorator } from "../state/ReduxStoreProviderDecorator";
import { TaskComponentWithRedux } from "../components/TaskComponent/TaskComponentWithRedux";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../state/store";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskComponentWithRedux> = {
    title: 'TODOLISTS/TaskComponentWithRedux',
    component: TaskComponentWithRedux,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator],
    args: {
        todoListId: 'dffggfgg'
    }
};

export default meta;
type Story = StoryObj<typeof TaskComponentWithRedux>;


const TaskComponentWithReduxWrap = () => {
    const todolistId = 'todolistId1'
    const task = useSelector<AppRootStateType, TaskType>(state =>
        state.tasks[todolistId][0])

    return <TaskComponentWithRedux
        todoListId={todolistId}
        taskId={task.id}
        completed={task.completed}
        oldTitle={task.title}
    />
}
export const TaskComponentWithReduxStory: Story = {

    render: () => <TaskComponentWithReduxWrap/>
};

