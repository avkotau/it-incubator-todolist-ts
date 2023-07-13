import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { TaskComponent, TaskComponentPropsType } from "../components/TaskComponent/TaskComponent";
import { FC, useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskComponent> = {
    title: 'TODOLISTS/Task',
    component: TaskComponent,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        todoListId: 'ewrgwreg',
        taskId: 'rwtht',
        completed: true,
        oldTitle: 'JS',
        removeTask: action('removeTask'),
        updateTaskTitle: action('updateTaskTitle'),
        changeTaskStatus: action('changeTaskStatus')
    },
};

export default meta;
type Story = StoryObj<typeof TaskComponent>;

export const TaskIsDoneStory: Story = {};

export const TaskIsNotDoneStory: Story = {
    args: {
        completed: false,
        oldTitle: 'Css',
    },
};


export const TaskIsWithHook: FC<TaskComponentPropsType> = (args) => {
    const {
        taskId,
        completed,
        oldTitle
    } = args
    const [task, setTask] = useState({
        taskId,
        completed,
        oldTitle
    });
    const changeTaskStatus = () => {
        setTask({...task, completed: !task.completed})
    }

    const updateTaskTitle = (taskId: string, title: string) => {
        setTask({...task, oldTitle: title})
    }

    return <TaskComponent todoListId={args.todoListId}
                          taskId={task.taskId}
                          completed={task.completed}
                          oldTitle={task.oldTitle}
                          removeTask={args.removeTask}
                          updateTaskTitle={updateTaskTitle}
                          changeTaskStatus={changeTaskStatus}/>
};


export const TaskIsWithHooksStory: Story = {
    render: ((args) => <TaskIsWithHook
        todoListId={args.todoListId}
        taskId={args.taskId}
        completed={args.completed}
        oldTitle={args.oldTitle}
        removeTask={args.removeTask}
        updateTaskTitle={args.updateTaskTitle}
        changeTaskStatus={args.changeTaskStatus}
    />)
}
