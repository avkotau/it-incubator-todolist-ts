import styles from "../TodoList/TodoList.module.css";
import { CheckboxContainer } from "../CheckboxContainer/CheckboxContainer";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { memo } from "react";


export type TaskComponentPropsType = {
    todoListId: string
    taskId: string
    completed: boolean
    oldTitle: string
    removeTask: (id: string) => void
    updateTaskTitle: (taskId: string, updateTitle: string) => void
    changeTaskStatus: (id: string, event: boolean) => void
}

export const TaskComponent: React.FC<TaskComponentPropsType> = memo((props) => {
    const {
        taskId,
        completed,
        oldTitle,
        removeTask,
        updateTaskTitle,
        changeTaskStatus
    } = props

    return (
        <li className={completed ? styles.isDone : ''}>

            {/* Checkbox for marking a task as completed or incomplete.*/}
            <CheckboxContainer completed={completed}
                               onClickCheckboxHandle={(completed) => changeTaskStatus(taskId, completed)}/>
            <EditableSpan oldTitle={oldTitle}
                          changeTaskTitle={(title) => updateTaskTitle(taskId, title)}/>

            <IconButton aria-label="delete" size="small"
                        onClick={() => {
                            removeTask(taskId)
                        }}>
                <DeleteIcon/>
            </IconButton>
        </li>
    )
})
