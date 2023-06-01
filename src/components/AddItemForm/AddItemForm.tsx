import styles from "../TodoList/TodoList.module.css";
// import Button from "../Button/Button";
import React, { ChangeEventHandler, KeyboardEventHandler, useState } from "react";
import Button from "@mui/material/Button";


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
            <input value={inputText}
                   onChange={onChangeInputHandle}
                   onKeyPress={onKeyPressInputHandler}
                   className={error ? styles.error : ''}
            />
            <Button
                style={{
                    maxWidth: '30px',
                    maxHeight: '30px',
                    minWidth: '30px',
                    minHeight: '30px',
                    backgroundColor: 'black'
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
