import React, { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import Button from "../Button/Button";
import styles from "./TodoList.module.css";
import { FilterValuesType, TaskType } from "../../App";
import AddItemForm from "../AddItemForm/AddItemForm";
import Editable from "../EditableSpan";
import EditableSpan from "../EditableSpan";


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

    const onClickCheckboxHandle = (id: string, event: boolean) => {
        props.changeTaskStatus(id, event, todoListId)
    }

    const mapTodos = tasks.map(el => {


            return (
                <li key={el.id + el.title} className={el.completed ? styles.isDone : ''}>
                    <input type="checkbox" checked={el.completed}
                           onChange={(event) => onClickCheckboxHandle(el.id, event.currentTarget.checked)}/>
                    {/*<span>{el.title}</span>*/}
                    <EditableSpan oldTitle={el.title} />
                    <button onClick={() => {
                        removeTask(el.id, todoListId)
                    }}>x
                    </button>
                </li>)
        }
    )
    const addTaskHandler = (inputText: string) => {
        addTask(inputText, todoListId)
    }
    return <div>
        <h3>{title}</h3>
        <div>
            <AddItemForm callBackAddTask={addTaskHandler}/>
        </div>
        <div className={styles.errorMessage}>{"!!error && error"}</div>
        <div>
            <button onClick={() => removeTodoList ? removeTodoList(todoListId) : ''}>delete TodoList</button>
        </div>
        <div>
            <Button bntActive={filter === 'all'} callBackButton={() => changeTodoListFilter("all", todoListId)}
                    name={'all'}/>
            <Button bntActive={filter === 'active'} callBackButton={() => changeTodoListFilter("active", todoListId)}
                    name={'active'}/>
            <Button bntActive={filter === 'completed'}
                    callBackButton={() => changeTodoListFilter("completed", todoListId)}
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
