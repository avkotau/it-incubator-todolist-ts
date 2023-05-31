import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { v1 } from "uuid";
import AddItemForm from "./components/AddItemForm/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed" | "first three tasks";

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

function App(): JSX.Element {
    let todoListId_1 = v1();
    let todoListId_2 = v1();

    let [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
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

    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/todos')
    //         .then((res) => {
    //             setTasks(res.data)
    //
    //         })
    // }, [])

    const removeTask = (id: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id)})
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
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
        // console.log(newId, e)

        //request server  update task id status

        // ok

        // if ok
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

    const addTodoLists = (inputText: string) => {
        const newTodoListId = v1();
        const newTodoList: TodoListsType = {id: newTodoListId, title: inputText, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})

    }

    const updateTask = (todoListId: string, taskId: string, updateTitle: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskId
                ? {...el, title: updateTitle}
                : el)
        })

    }


    const updateTodoListTitle = (todoListId: string, updateTitle: string) => {

        setTodoLists(todoLists.map(tl => tl.id === todoListId
            ? {...tl, title: updateTitle}
            : tl
        ))
    }

    const todoListsComponents = todoLists.map(tl => {
        let tasksForRender: TaskType[] = getFilteredTasksForRender(tasks[tl.id], tl.filter)
        // console.log('tasksForRender',tasksForRender)
        return (
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
        )
    })


    return (
        <div className="App">
            <AddItemForm callBackAddTask={addTodoLists}/>
            {todoListsComponents}
        </div>


    );
}

export default App;
