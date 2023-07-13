import React, { Reducer, useReducer } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { v1 } from "uuid";
import { Grid, Paper } from "@mui/material";

import {
    addTodoListAC, changeTodoListFilterAC,
    removeTodoListAC,
    TodolistActionsType,
    todolistsReducer,
    updateTodoListTitleAC
} from "./state/todolists-reducer";

import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksActionsType,
    tasksReducer
} from "./state/tasks-reducer";

import ButtonAppBar from "./components/Button/ButtonAppBar";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import Container from "@mui/material/Container";

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

function AppWithReducers(): JSX.Element {
    let todoListId_1 = v1();
    let todoListId_2 = v1();

    //type useReducers for example
    const [todoLists, dispatchToTodolist] = useReducer<Reducer<TodoListsType[], TodolistActionsType>>(todolistsReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ]);

    const [tasks, dispatchToTasks] = useReducer<Reducer<TasksStateType, TasksActionsType>>(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: "Html", completed: true},
            {id: v1(), title: "Css", completed: true},
            {id: v1(), title: "Redux", completed: true},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Bread", completed: true},
            {id: v1(), title: "Milk", completed: true},
            {id: v1(), title: "Salt", completed: true},
        ]
    });

    const removeTask = (id: string, todoListId: string) => {
        dispatchToTasks(removeTaskAC(id, todoListId))
    }

    const removeTodoList = (todoListId: string) => {
        let action = removeTodoListAC(todoListId)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    const addTodoLists = (inputText: string) => {
        let action = addTodoListAC(inputText)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    const updateTodoListTitle = (todoListId: string, updateTitle: string) => {
        dispatchToTodolist(updateTodoListTitleAC(todoListId, updateTitle))
    }

    const addTask = (inputText: string, todoListId: string) => {
        dispatchToTasks(addTaskAC(inputText, todoListId))
    }

    const changeTaskStatus = (newId: string, completed: boolean, todoListId: string) => {
        dispatchToTasks(changeTaskStatusAC(newId, completed, todoListId))
    }

    const changeTodoListFilter = (filterValue: FilterValuesType, todoListId: string) => {
        dispatchToTodolist(changeTodoListFilterAC(todoListId, filterValue))
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
        dispatchToTasks(changeTaskTitleAC(updateTitle, taskId, todoListId))
    }

    const todoListsComponents = todoLists.map(tl => {
        let tasksForRender: TaskType[] = getFilteredTasksForRender(tasks[tl.id], tl.filter)

        return (
            <Grid item columnSpacing={3} key={tl.id}>
                <Paper elevation={5} style={{padding: 10}}>
                    <TodoList
                        key={tl.id}
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
                    <AddItemForm addItem={addTodoLists}/>
                </Grid>
                <Grid container columnSpacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>

    );
}

export default AppWithReducers;
