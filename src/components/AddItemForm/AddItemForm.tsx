import React, { ChangeEventHandler, KeyboardEventHandler, memo, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";



export type AddItemFormType = {
    addItem: (inputText: string) => void
}

const AddItemForm: React.FC<AddItemFormType> = memo(({
    addItem,
}) => {

    const [inputText, setInputText] = useState('');
    const [error, setError] = useState<string | null>('');

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

})

export default AddItemForm
