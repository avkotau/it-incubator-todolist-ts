import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { v1 } from "uuid";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import ButtonAppBar from "./components/Button/ButtonAppBar";
import Container from '@mui/material/Container';
import { Grid, Paper } from "@mui/material";

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

function AppWithUseState(): JSX.Element {
    let todoListId_1 = v1();
    let todoListId_2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id)})
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const addTodoLists = (inputText: string) => {
        const newTodoListId = v1();
        const newTodoList: TodoListsType = {id: newTodoListId, title: inputText, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})
    }

    const updateTodoListTitle = (todoListId: string, updateTitle: string) => {

        setTodoLists(todoLists.map(tl => tl.id === todoListId
            ? {...tl, title: updateTitle}
            : tl
        ))
    }

    const addTask = (inputText: string, todoListId: string) => {

        if (inputText.trim().length > 0) {
            setTasks({
                ...tasks, // doesn't work if put after todoListId
                [todoListId]: [
                    {id: v1() as string, title: inputText, completed: false},
                    ...tasks[todoListId]
                ]
            })
        }
    }

    const changeTaskStatus = (newId: string, e: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === newId ? {...t, completed: e} : t)})
    }

    const changeTodoListFilter = (filterValue: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId
            ? {...tl, filter: filterValue}
            : tl));
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
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskId
                ? {...el, title: updateTitle}
                : el)
        })

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
                    <AddItemForm callBackAddTask={addTodoLists}/>
                </Grid>
                <Grid container columnSpacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>

    );
}

export default AppWithUseState;
