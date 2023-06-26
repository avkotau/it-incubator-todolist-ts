import React, { useCallback } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { Grid, Paper } from "@mui/material";

import {
    addTodoListAC, changeTodoListFilterAC,
    removeTodoListAC,
    updateTodoListTitleAC
} from "./state/todolists-reducer";

import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from "./state/tasks-reducer";

import ButtonAppBar from "./components/Button/ButtonAppBar";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";


export type FilterValuesType = "all" | "active" | "completed" | "first three tasks" | "delete";


export type TaskType = {
    id: string
    title: string
    completed: boolean
}

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListId: string]: TaskType[]
}

function  AppWithRedux(): JSX.Element {

    let todolists = useSelector<AppRootStateType, TodoListsType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    },[dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatch(action)
    },[dispatch])

    const addTodoLists = useCallback((inputText: string) => {
        const action = addTodoListAC(inputText)
        dispatch(action)
    }, [dispatch])

    const updateTodoListTitle = useCallback((todoListId: string, updateTitle: string) => {
        dispatch(updateTodoListTitleAC(todoListId, updateTitle))
    },[dispatch])

    const addTask = useCallback((inputText: string, todoListId: string) => {
        dispatch(addTaskAC(inputText, todoListId))
    },[dispatch])

    const changeTaskStatus = useCallback((newId: string, completed: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(newId, completed, todoListId))
    },[dispatch])

    const changeTodoListFilter = useCallback((filterValue: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(todoListId, filterValue))
    },[dispatch])

    const updateTask = useCallback((todoListId: string, taskId: string, updateTitle: string) => {
        dispatch(changeTaskTitleAC(updateTitle, taskId, todoListId))
    },[dispatch])

    const todoListsComponents = todolists.map(tl => {

        return (
            <Grid item columnSpacing={3} key={tl.id}>
                <Paper elevation={5} style={{padding: 10}}>
                    <TodoList
                        todoListId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        changeTodoListFilter={changeTodoListFilter}
                        tasks={tasks[tl.id]}
                        // tasks={tasksForRender}//??
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        updateTask={updateTask}
                        updateTodoListTitle={updateTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container columnSpacing={3} style={{padding: 25}}>
                    <AddItemForm callBackAddTask={addTodoLists}/>
                </Grid>
                <Grid container columnSpacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>

    );
}

export default AppWithRedux;
