import React from 'react';
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

import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";
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

    const removeTask = (id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    }

    const removeTodoList = (todoListId: string) => {
        let action = removeTodoListAC(todoListId)
        dispatch(action)
    }

    const addTodoLists = (inputText: string) => {
        let action = addTodoListAC(inputText)
        dispatch(action)
    }

    const updateTodoListTitle = (todoListId: string, updateTitle: string) => {
        dispatch(updateTodoListTitleAC(todoListId, updateTitle))
    }

    const addTask = (inputText: string, todoListId: string) => {
        dispatch(addTaskAC(inputText, todoListId))
    }

    const changeTaskStatus = (newId: string, completed: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(newId, completed, todoListId))
    }

    const changeTodoListFilter = (filterValue: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(todoListId, filterValue))
    }

    //UI
    const getFilteredTasksForRender = (tasksList: TaskType[], filterValue: FilterValuesType) => {

        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.completed);
            case "completed":
                return tasksList.filter(t => t.completed);
            case "first three tasks":
                return tasksList.filter((t, i) => i < 3);
            default:
                return tasksList;
        }
    }

    const updateTask = (todoListId: string, taskId: string, updateTitle: string) => {
        dispatch(changeTaskTitleAC(updateTitle, taskId, todoListId))
    }

    const todoListsComponents = todolists.map(tl => {
        let tasksForRender: TaskType[] = getFilteredTasksForRender(tasks[tl.id], tl.filter)

        return (
            <Grid item columnSpacing={3} key={tl.id}>
                <Paper elevation={5} style={{padding: 10}}>
                    <TodoList
                        todoListId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        changeTodoListFilter={changeTodoListFilter}
                        tasks={tasksForRender}
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
