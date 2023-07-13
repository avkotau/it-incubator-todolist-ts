import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { EditableSpan } from "../components/EditableSpan/EditableSpan";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        oldTitle: 'Title EditableSpan',
    },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
    args: {
        changeTaskTitle: action('Button clicked inside form')
    },
};
