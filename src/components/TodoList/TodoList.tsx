import React, { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import Button from "../Button/Button";
import styles from "./TodoList.module.css";

export type FilterValuesType = "all" | "active" | "completed" | "first three tasks";

export type TaskType = {
    id: string
    title: string
    completed: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    deleteAllTasks: () => void
    addTask: (textInput: string) => void
    clickCheckbox: (id: string, event: boolean) => void
}

export const TodoList: React.FC<PropsType> = (props) => {
    const {title, tasks, deleteAllTasks, removeTask, addTask} = props
    const [inputText, setInputText] = useState('');

    const [error, setError] = useState<string | null>('');

    const [filter, setFilter] = useState<FilterValuesType>("all");


    const filteredTasks = () => {
        let tasksForTodolist;

        switch (filter) {
            case "active":
                tasksForTodolist = tasks.filter(t => !t.completed);
                break;
            case "completed":
                tasksForTodolist = tasks.filter(t => t.completed);
                break;
            case "first three tasks":
                tasksForTodolist = tasks.filter((t, i) => i < 3);
                break;
            default:
                tasksForTodolist = tasks;
        }
        return tasksForTodolist
    }

    let tasksForTodolist = filteredTasks();

    const onChangeInputHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputText(e.currentTarget.value);
    }

    const addTaskHandle = () => {
        if (inputText.trim() === '') {
            setError('Error')
        } else {
            addTask(inputText.trim())
            setInputText('')
            setError('')
        }
    }
    const onKeyPressInputHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.code === 'Enter') addTaskHandle()
    }

    const filterButtonsHandler = (filterValue: FilterValuesType) => {
        setFilter(filterValue);

    }

    const onClickCheckboxHandle = (id: string, event: boolean) => {
        props.clickCheckbox(id, event)
    }

    const mapTodos = tasksForTodolist.map(el => (
        <li key={el.id + el.title} className={el.completed ? styles.isDone : ''}>
            <input type="checkbox" checked={el.completed}
                   onChange={(event) => onClickCheckboxHandle(el.id, event.currentTarget.checked)}/>
            <span>{el.title}</span>
            <button onClick={() => {
                removeTask(el.id)
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
            <button onClick={deleteAllTasks}>delete</button>
        </div>
        <div>
            <Button bntActive={filter === 'all'} callBackButton={() => filterButtonsHandler("all")} name={'all'}/>
            <Button bntActive={filter === 'active'} callBackButton={() => filterButtonsHandler("active")} name={'active'}/>
            <Button bntActive={filter === 'completed'} callBackButton={() => filterButtonsHandler("completed")} name={'completed'}/>
            <Button bntActive={filter === 'first three tasks'} callBackButton={() => filterButtonsHandler("first three tasks")}
                    name={'first three tasks'}/>
        </div>
        <ul>
            {mapTodos}
        </ul>
    </div>
}
