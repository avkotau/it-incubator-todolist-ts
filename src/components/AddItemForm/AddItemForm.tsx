import React, { ChangeEventHandler, KeyboardEventHandler, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";



type AddItemFormType = {
    callBackAddTask: (inputText: string) => void
}

const AddItemForm: React.FC<AddItemFormType> = ({
    callBackAddTask,
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
            callBackAddTask(inputText.trim())
            setInputText('')
            setError('')
        }
    }

    const onKeyPressInputHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.code === 'Enter') addTaskHandle()
    }
    return (
        <div>
            {/*<input*/}
            {/*    value={inputText}*/}
            {/*       onChange={onChangeInputHandle}*/}
            {/*       onKeyPress={onKeyPressInputHandler}*/}
            {/*       className={error ? styles.error : ''}*/}
            {/*/>*/}

            <TextField
                error={!!error}
                size={'small'}
                id="outlined-basic"
                label={error ? 'Title is required' : 'Type out something'}
                variant="outlined"
                value={inputText}
                onChange={onChangeInputHandle}
                onKeyPress={onKeyPressInputHandler}
                // className={error ? styles.error : ''}
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
                // name={'+'}
            >+</Button>

            {/*<Button callBackButton={addTaskHandle} name={'+'}/>*/}
        </div>
    )

}

export default AddItemForm
