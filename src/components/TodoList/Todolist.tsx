import React, { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import { FilterValuesType } from '../../App';
import Button from "../Button/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    deleteAllTasks: () => void
    addTask: (textInput: string) => void
}

export function Todolist(props: PropsType) {
    const {title, tasks, deleteAllTasks, removeTask, addTask} = props
    const [inputText, setInputText] = useState('');

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "first three tasks") {
        tasksForTodolist = tasks.filter((t, i) => i < 3);
    }

    // filterTasks === 'All'
    //     ? props.tasks
    //     : filterTasks === 'Active'
    //         ? props.tasks.filter(el => el.isDone)
    //         : filterTasks === 'Completed'
    //             ? props.tasks.filter(el => !el.isDone)
    //             : props.tasks


    const onChangeInputHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputText(e.currentTarget.value);
    }

    const addTaskHandle = () => {
        addTask(inputText)
        setInputText('')
    }
    const onKeyPressInputHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.code === 'Enter') addTaskHandle()
    }

    const filterButtonsHandler = (filterValue: FilterValuesType) => {
        setFilter(filterValue);
    }

    return <div>
        <h3>{title}</h3>
        <div>
            <input value={inputText}
                   onChange={onChangeInputHandle}
                   onKeyPress={onKeyPressInputHandler}
            />
            <Button callBackButton={addTaskHandle} name={'+'}/>
        </div>
        <ul>
            {
                tasksForTodolist.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        removeTask(t.id)
                    }}>x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={deleteAllTasks}>delete
            </button>
        </div>
        <div>
            <Button callBackButton={() => filterButtonsHandler("all")}  name={ 'all'}/>
            <Button callBackButton={() => filterButtonsHandler("active")}  name={ 'active'}/>
            <Button callBackButton={() => filterButtonsHandler("completed")}  name={ 'completed'}/>
            <Button callBackButton={() => filterButtonsHandler("first three tasks")}  name={ 'first three tasks'}/>

            {/*<button onClick={() => filterButtonsHandler("all")}>*/}
            {/*    All*/}
            {/*</button>*/}
        </div>
    </div>
}


//------------------------------------------------------------------------------------------------

// import React, {useState} from 'react';
// import {FilterValuesType} from './App';
//
// type TaskType = {
//     id: number
//     title: string
//     isDone: boolean
// }
//
// type PropsType = {
//     title: string
//     tasks: Array<TaskType>
//     removeTask: (taskId: number) => void
//     //changeFilter: (value: FilterValuesType) => void
//     deleteAllTasks:()=>void
// }
//
// export function Todolist(props: PropsType) {
//
//     let [filter, setFilter] = useState<FilterValuesType>("all");
//
//     let tasksForTodolist = props.tasks;
//
//     if (filter === "three") {
//         tasksForTodolist = props.tasks.filter(t => t.id<4);
//     }
//     if (filter === "active") {
//         tasksForTodolist = props.tasks.filter(t => t.isDone === false);
//     }
//     if (filter === "completed") {
//         tasksForTodolist = props.tasks.filter(t => t.isDone === true);
//     }
//
//     function changeFilter(value: FilterValuesType) {
//         setFilter(value);
//     }
//
//     return <div>
//         <h3>{props.title}</h3>
//         <div>
//             <input/>
//             <button>+</button>
//         </div>
//         <ul>
//             {
//                 tasksForTodolist.map(t => <li key={t.id}>
//                     <input type="checkbox" checked={t.isDone}/>
//                     <span>{t.title}</span>
//                     <button onClick={ () => { props.removeTask(t.id) } }>x</button>
//                 </li>)
//             }
//         </ul>
//         <button onClick={()=>props.deleteAllTasks()}>DELETE ALL TASKS</button>
//         <div>
//             <button onClick={ () => { changeFilter("three") } }>
//                 Give me the first three
//             </button>
//             <button onClick={ () => { changeFilter("all") } }>
//                 All
//             </button>
//             <button onClick={ () => { changeFilter("active") } }>
//                 Active
//             </button>
//             <button onClick={ () => { changeFilter("completed") } }>
//                 Completed
//             </button>
//         </div>
//     </div>
// }
