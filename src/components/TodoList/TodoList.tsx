import React from 'react';
import styles from "./TodoList.module.css";
import { FilterValuesType, TaskType } from "../../AppWithReducers";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { CheckboxContainer } from "../CheckboxContainer/CheckboxContainer";


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
    updateTask: (todoListId: string, taskId: string, updateTitle: string) => void
    updateTodoListTitle: (todoListId: string, updateTitle: string) => void
}

export const TodoList: React.FC<PropsType> = (props) => {
    const {
        title, tasks, filter,
        todoListId, removeTodoList,
        removeTask, addTask, changeTodoListFilter,
        updateTask, updateTodoListTitle
    } = props

    const onClickCheckboxHandle = (id: string, event: boolean) => {
        props.changeTaskStatus(id, event, todoListId)
    }

    const updateTaskHandler = (taskId: string, updateTitle: string) => {
        updateTask(todoListId, taskId, updateTitle)
    }
//first render tasks ===  undefined
    const mapTodos = tasks.map(el => {

            return (
                <li key={el.id + el.title} className={el.completed ? styles.isDone : ''}>
                   {/* Checkbox for marking a task as completed or incomplete.*/}
                    <CheckboxContainer completed={el.completed} onClickCheckboxHandle={( event) => onClickCheckboxHandle(el.id, event)}/>
                    <EditableSpan oldTitle={el.title}
                                  callBackAddTask={(updateTitle) => updateTaskHandler(el.id, updateTitle)}/>

                    <IconButton aria-label="delete" size="small"
                                onClick={() => {
                                    removeTask(el.id, todoListId)
                                }}>
                        <DeleteIcon/>
                    </IconButton>
                </li>)
        }
    )

    const addTaskHandler = (inputText: string) => {
        addTask(inputText, todoListId)
    }

    return <div>

        <EditableSpan oldTitle={title}
                      callBackAddTask={(updateTitle) => updateTodoListTitle(todoListId, updateTitle)}/>

        <IconButton aria-label="delete" size="small"
                    onClick={() => removeTodoList ? removeTodoList(todoListId) : ''}>
            <DeleteIcon/>
        </IconButton>

        <div>
            <AddItemForm callBackAddTask={addTaskHandler}/>
        </div>

        <div>
            <Button variant={filter === 'all' ? 'contained' : "outlined"}
                    onClick={() => changeTodoListFilter("all", todoListId)}>all</Button>
            <Button variant={filter === 'active' ? 'contained' : "outlined"}
                    onClick={() => changeTodoListFilter("active", todoListId)}>active</Button>
            <Button variant={filter === 'completed' ? 'contained' : "outlined"}
                    onClick={() => changeTodoListFilter("completed", todoListId)}>completed</Button>
            <Button variant={filter === 'first three tasks' ? 'contained' : "outlined"}
                    onClick={() => changeTodoListFilter("first three tasks", todoListId)}>first three tasks</Button>
        </div>
        <ul>
            {mapTodos}
        </ul>
    </div>
}
