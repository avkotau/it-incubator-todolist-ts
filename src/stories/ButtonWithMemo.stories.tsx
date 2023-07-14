import type { Meta, StoryObj } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import { ButtonWithMemo } from "../components/Button/ButtonWithMemo";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ButtonWithMemo> = {
    title: 'TODOLISTS/ButtonWithMemo',
    component: ButtonWithMemo,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        title: 'all',
        color: 'primary',
        variant: 'contained',
    },
};

export default meta;
type Story = StoryObj<typeof ButtonWithMemo>;


const createStory = (title: string,
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    variant: 'text' | 'outlined' | 'contained') => ({
    args: {
        title,
        color,
        variant,
        onClick: action('Button clicked')
    }
});

export const ButtonWithMemoAllCheckedStory: Story = createStory(
    'all', 'primary', 'contained'
);
export const ButtonWithMemoAllUnCheckedStory: Story = createStory(
    'all', 'primary', 'outlined'
);
export const ButtonWithMemoActiveCheckedStory: Story = createStory(
    'active', 'secondary', 'contained'
);
export const ButtonWithMemoActiveUnCheckedStory: Story = createStory(
    'active', 'secondary', 'outlined'
);
export const ButtonWithMemoCompletedCheckedStory: Story = createStory(
    'completed', 'success', 'contained'
);
export const ButtonWithMemoCompletedUnCheckedStory: Story = createStory(
    'completed', 'success', 'outlined'
);
export const ButtonWithMemoFirstThreeTasksCheckedStory: Story = createStory(
    'first three tasks', 'warning', 'contained'
);
export const ButtonWithMemoFirstThreeTasksUnCheckedStory: Story = createStory(
    'first three tasks', 'warning', 'outlined'
);




