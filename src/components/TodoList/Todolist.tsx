import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';
import Button from "../Button/Button";

export type FilterValuesType = "all" | "active" | "completed" | "first three tasks";

export type TaskType = {
    id: string
    title: string
    completed: boolean
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

    const filteredTasks = () => {
        let tasksForTodolist;

        switch (filter) {
            case "active":
                tasksForTodolist = tasks.filter(t => t.completed === false);
                break;
            case "completed":
                tasksForTodolist = tasks.filter(t => t.completed === true);
                break;
            case "first three tasks":
                tasksForTodolist = tasks.filter((t, i) => i < 3);
                break;
            default:
                tasksForTodolist = tasks;
        }
        return tasksForTodolist
    }

    let tasksForTodolist = filteredTasks();

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

    const mapTodos = tasksForTodolist.map(el => (
        <li key={el.id}>
            <input type="checkbox" checked={el.completed}/>
            <span>{el.title}</span>
            <button onClick={() => {
                removeTask(el.id)
            }}>x
            </button>
        </li>)
    )

    return <div>
        <h3>{title}</h3>
        <div>
            <input value={inputText}
                   onChange={onChangeInputHandle}
                   onKeyPress={onKeyPressInputHandler}
            />
            <Button callBackButton={addTaskHandle} name={'+'}/>
        </div>
        <div>
            <button onClick={deleteAllTasks}>delete
            </button>
        </div>
        <div>
            <Button callBackButton={() => filterButtonsHandler("all")} name={'all'}/>
            <Button callBackButton={() => filterButtonsHandler("active")} name={'active'}/>
            <Button callBackButton={() => filterButtonsHandler("completed")} name={'completed'}/>
            <Button callBackButton={() => filterButtonsHandler("first three tasks")} name={'first three tasks'}/>
        </div>
        <ul>
            {mapTodos}
        </ul>
    </div>
}
