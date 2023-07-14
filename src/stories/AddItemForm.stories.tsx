import type { Meta, StoryObj } from '@storybook/react';

import AddItemForm, { AddItemFormType } from "../components/AddItemForm/AddItemForm";
import React, { ChangeEventHandler, FC, KeyboardEventHandler, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { action } from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            // action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
    args: {
        addItem: action('Button clicked inside form')
    },
};


export const AddItemFormComponent: FC<AddItemFormType> = ({addItem}) => {

    const [inputText, setInputText] = useState('');
    const [error, setError] = useState<string | null>('Error');

    const onChangeInputHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputText(e.currentTarget.value);
    }
    const addTaskHandle = () => {

        if (inputText.trim() === '') {
            setError('Error')
        } else {
            addItem(inputText.trim())
            setInputText('')
            setError('')
        }
    }

    const onKeyPressInputHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') addTaskHandle()
    }
    return (
        <div>
            <TextField
                error={!!error}
                size={'small'}
                id="outlined-basic"
                label={error ? 'Title is required' : 'Type out something'}
                variant="outlined"
                value={inputText}
                onChange={onChangeInputHandle}
                onKeyPress={onKeyPressInputHandler}
            />
            <Button
                style={{
                    maxWidth: '39px',
                    maxHeight: '39px',
                    minWidth: '39px',
                    minHeight: '39px',
                }}
                variant={'contained'}
                onClick={addTaskHandle}
            >+</Button>
        </div>
    )
};


export const AddItemFormErrorStory: Story = {
    args: {
        addItem: action('Button clicked inside form')
    },
    render: (args) => {
        return <AddItemFormComponent addItem={args.addItem}/>
    }
};


