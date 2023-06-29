import React, { memo, useCallback } from 'react';
import { FilterValuesType, TaskType } from "../../AppWithReducers";
import AddItemForm from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { ButtonWithMemo } from "../Button/ButtonWithMemo";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskComponentWithRedux } from "../TaskComponent/TaskComponentWithRedux";


type PropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void // refactor
    addTask: (inputText: string, todoListId: string) => void
    changeTaskStatus: (id: string, completed: boolean, todoListId: string) => void
    updateTask: (todoListId: string, taskId: string, updateTitle: string) => void
    updateTodoListTitle: (todoListId: string, updateTitle: string) => void
}

export const TodoList: React.FC<PropsType> = memo((props) => {
    const {
        title, filter,
        todoListId, removeTodoList,
        addTask, changeTodoListFilter,
        updateTodoListTitle
    } = props

    let {tasks} = props

    const addTaskHandler = useCallback((inputText: string) => {
        addTask(inputText, todoListId)
    }, [addTask, todoListId])

    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }

    const onAllClickHandler = useCallback(
        () => changeTodoListFilter('all', todoListId), [changeTodoListFilter, todoListId]
    )
    const onActiveClickHandler = useCallback(
        () => changeTodoListFilter('active', todoListId), [changeTodoListFilter, todoListId]
    )
    const onCompletedClickHandler = useCallback(
        () => changeTodoListFilter('completed', todoListId), [changeTodoListFilter, todoListId]
    )
    const onThreeClickHandler = useCallback(
        () => changeTodoListFilter('first three tasks', todoListId), [changeTodoListFilter, todoListId]
    )

    if (filter === "active") {
        tasks = tasks.filter(t => !t.completed);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.completed);
    }
    if (filter === "first three tasks") {
        tasks = tasks.filter((t, i) => i < 3);
    }
    //Use if using TaskComponent
    // const removeTaskHandler = useCallback(
    //     (taskId: string) => removeTask(taskId, todoListId),
    //     [removeTask, todoListId])
    //
    // const changeTaskTitleHandler = useCallback(
    //     (taskId: string, updateTitle: string) => updateTask(todoListId, taskId, updateTitle),
    //     [updateTask, todoListId])
    //
    // const changeTaskStatusHandler = useCallback(
    //     (taskId: string, completed: boolean) => changeTaskStatus(taskId, completed, todoListId),
    //     [changeTaskStatus, todoListId])

    const updateTodoListTitleHandler = useCallback((updateTitle: string) => {
        updateTodoListTitle(todoListId, updateTitle)
    },[updateTodoListTitle, todoListId])

    const mapTodos = tasks.map(el => {

            return (
                <TaskComponentWithRedux key={el.id + el.title}
                                        todoListId={todoListId}
                                        taskId={el.id}
                                        completed={el.completed}
                                        oldTitle={el.title}

                />
            )
        }
    )


    return <div>

        <EditableSpan oldTitle={title}
                      changeTaskTitle={updateTodoListTitleHandler}/>
        <IconButton aria-label="delete" size="small"
                    onClick={removeTodoListHandler}>
            <DeleteIcon/>
        </IconButton>

        <div>
            <AddItemForm callBackAddTask={addTaskHandler}/>
        </div>

        <div>

            <ButtonWithMemo title={'all'}
                            variant={filter === 'all' ? 'contained' : "outlined"}
                            color={'primary'}
                            onClick={onAllClickHandler}/>
            <ButtonWithMemo title={'active'}
                            variant={filter === 'active' ? 'contained' : "outlined"}
                            color={'secondary'}
                            onClick={onActiveClickHandler}/>
            <ButtonWithMemo title={'completed'}
                            variant={filter === 'completed' ? 'contained' : "outlined"}
                            color={'success'}
                            onClick={onCompletedClickHandler}/>
            <ButtonWithMemo title={'first three tasks'}
                            variant={filter === 'first three tasks' ? 'contained' : "outlined"}
                            color={'warning'}
                            onClick={onThreeClickHandler}/>
        </div>
        <ul>
            {mapTodos}
        </ul>
    </div>
})


