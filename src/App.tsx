import { useEffect, useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { v1 } from "uuid";
import axios from "axios";

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

    // let [tasks, setTasks] = useState<TaskType[]>([
    //
    //     {id: v1(), title: "Html", completed: true},
    //     {id: v1(), title: "Css", completed: true},
    //     {id: v1(), title: "Redux", completed: true},
    // ]);

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

    // let todoList_1 = {
    //     [todoListId_1]: [
    //         {id: v1(), title: "Html", completed: true},
    //         {id: v1(), title: "Css", completed: true},
    //         {id: v1(), title: "Redux", completed: true},
    //     ]
    // }
    //
    // let todoList_2 = {
    //     [todoListId_2]: [
    //         {id: v1(), title: "Bread", completed: true},
    //         {id: v1(), title: "Milk", completed: true},
    //         {id: v1(), title: "Salt", completed: true},
    //     ]
    // }

    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/todos')
    //         .then((res) => {
    //             setTasks(res.data)
    //
    //         })
    // }, [])

    function removeTask(id: string, todoListId: string) {

        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id)})
        // console.log({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id) })
        //setTasks([tasks[todoListId]: tasks[todoListId].filter(t => t.id !== id)])
        // let filteredTasks = tasks.filter(t => t.id !== id);
        // setTasks(filteredTasks);
    }

    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const addTask = (task: string, todoListId: string) => {

        if (task.trim().length > 0) {
            setTasks({
                [todoListId]: [
                    {id: v1() as string, title: task, completed: true},
                    ...tasks[todoListId]
                ],
                ...tasks
        })
            //setTasks([{id: v1() as string, title: task, completed: true}, ...tasks]);
        }
    }

    const changeTaskStatus = (newId: string, e: boolean, todoListId: string) => {
        // console.log(newId, e)

        //request server  update task id status

        // ok

        // if ok
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === newId ? {...t, completed: e} : t)})
        //setTasks([...tasks.map(t => t.id === newId ? {...t, completed: e} : t)])
    }

    // const changeTodoListFilter = () => {
    //  2023-03-28 1:05:26 Viktor
    // }

    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      removeTodoList={removeTodoList}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
