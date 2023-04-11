import { useEffect, useState } from 'react';
import './App.css';
import { Todolist } from './components/TodoList/Todolist';
import { v4 } from "uuid";
import axios from "axios";

export type FilterValuesType = "all" | "active" | "completed" | "first three tasks";

//Hi guys!
//1. Let's create a 'DELETE ALL TASKS' button, and place it above the filter buttons
//Clicking the button removes all tasks
//2. Let's create a fourth filter button-if you click it, the first three tasks will be displayed
//3. Relocate everything associated with  filters to the Todolist.tsx component. Make it work
//
// let [filter, setFilter] = useState<FilterValuesType>("all");
//
// let tasksForTodolist = tasks;
//
// if (filter === "active") {
//     tasksForTodolist = tasks.filter(t => t.isDone === false);
// }
// if (filter === "completed") {
//     tasksForTodolist = tasks.filter(t => t.isDone === true);
// }
//
// function changeFilter(value: FilterValuesType) {
//     setFilter(value);
// }

function App() {

    let [tasks, setTasks] = useState([
        // {id: v4(), title: "HTML&CSS", completed: true},
        // {id: v4(), title: "JS", completed: true},
        // {id: v4(), title: "ReactJS", completed: false},
        // {id: v4(), title: "Rest API", completed: false},
        // {id: v4(), title: "GraphQL", completed: false},
    ]);


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((res) => {
                setTasks(res.data)

            })
    },[])
    console.log(tasks)


    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function deleteAllTasks() {
        setTasks([]);
    }

    const addTask = (task: string) => {
        if (task.trim().length > 0) {
            setTasks([{id: v4() as string, title: task, completed: true}, ...tasks]);
        }

    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      deleteAllTasks={deleteAllTasks}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;


//-------------------------------------------------------------------------

// import React, {useState} from 'react';
// import './App.css';
// import {Todolist} from './Todolist';
//
//
// export type FilterValuesType = "all" | "active" | "completed" | "three";
//
// function App() {
//
//     let [tasks, setTasks] = useState([
//         {id: 1, title: "HTML&CSS", isDone: true},
//         {id: 2, title: "JS", isDone: true},
//         {id: 3, title: "ReactJS", isDone: false},
//         {id: 4, title: "Rest API", isDone: false},
//         {id: 5, title: "GraphQL", isDone: false},
//     ]);
//
//     const deleteAllTasks = () => {
//         setTasks([])
//     }
//
//     function removeTask(id: number) {
//         let filteredTasks = tasks.filter(t => t.id != id);
//         setTasks(filteredTasks);
//     }
//
//     // let [filter, setFilter] = useState<FilterValuesType>("all");
//     //
//     // let tasksForTodolist = tasks;
//     //
//     // if (filter === "active") {
//     //     tasksForTodolist = tasks.filter(t => t.isDone === false);
//     // }
//     // if (filter === "completed") {
//     //     tasksForTodolist = tasks.filter(t => t.isDone === true);
//     // }
//     //
//     // function changeFilter(value: FilterValuesType) {
//     //     setFilter(value);
//     // }
//
//     return (
//         <div className="App">
//             <Todolist
//                 title="What to learn"
//                 tasks={tasks}
//                 removeTask={removeTask}
//                 //changeFilter={changeFilter}
//                 deleteAllTasks={deleteAllTasks}
//
//             />
//         </div>
//     );
// }
//
// export default App;
