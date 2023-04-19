import React, { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import Button from "../Button/Button";
import styles from "./TodoList.module.css";
import { FilterValuesType, TaskType } from "../../App";


type PropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList?: (todoListId: string) => void // refactor
    addTask: (inputText: string, todoListId: string) => void
    changeTaskStatus: (id: string, event: boolean, todoListId: string) => void
}

export const TodoList: React.FC<PropsType> = (props) => {
    const {title, tasks, filter, todoListId, removeTodoList, removeTask, addTask, changeTodoListFilter} = props
    const [inputText, setInputText] = useState('');

    const [error, setError] = useState<string | null>('');


    const onChangeInputHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputText(e.currentTarget.value);
    }

    const addTaskHandle = () => {
        if (inputText.trim() === '') {
            setError('Error')
        } else {
            addTask(inputText.trim(), todoListId)

            setInputText('')
            setError('')
        }
    }
    const onKeyPressInputHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.code === 'Enter') addTaskHandle()
    }

    const onClickCheckboxHandle = (id: string, event: boolean) => {
        props.changeTaskStatus(id, event, todoListId)
    }

    const mapTodos = tasks.map(el => (
        <li key={el.id + el.title} className={el.completed ? styles.isDone : ''}>
            <input type="checkbox" checked={el.completed}
                   onChange={(event) => onClickCheckboxHandle(el.id, event.currentTarget.checked)}/>
            <span>{el.title}</span>
            <button onClick={() => {
                removeTask(el.id, todoListId)
            }}>x
            </button>
        </li>)
    )

    return <div>
        <h3>{title}</h3>
        <div>
            <input value={inputText}
                   onChange={onChangeInputHandle}
                   onKeyPress={onKeyPressInputHandler}
                   className={error ? styles.error : ''}
            />
            <Button callBackButton={addTaskHandle} name={'+'}/>
        </div>
        <div className={styles.errorMessage}>{!!error && error}</div>
        <div>
            <button onClick={() => removeTodoList ? removeTodoList(todoListId) : ''}>delete</button>
        </div>
        <div>
            <Button bntActive={filter === 'all'} callBackButton={() => changeTodoListFilter("all", todoListId)} name={'all'}/>
            <Button bntActive={filter === 'active'} callBackButton={() => changeTodoListFilter("active", todoListId)}
                    name={'active'}/>
            <Button bntActive={filter === 'completed'} callBackButton={() => changeTodoListFilter("completed", todoListId)}
                    name={'completed'}/>
            <Button bntActive={filter === 'first three tasks'}
                    callBackButton={() => changeTodoListFilter("first three tasks", todoListId)}
                    name={'first three tasks'}/>
        </div>
        <ul>
            {mapTodos}
        </ul>
    </div>
}
