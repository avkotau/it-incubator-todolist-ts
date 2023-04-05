import React, { FC, useState } from 'react';

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: number) => void
}

const TodoList: FC<TodoListPropsType> = (props) => {
    let [filterTasks, setFilterTasks] = useState('All')

    const filteredTasks = (buttonName: string) => {

        setFilterTasks(buttonName)
    }

    let filterTask = props.tasks


    if (filterTasks === 'All') {
        filterTask = props.tasks
    }

    if (filterTasks === 'Active') {
        filterTask = props.tasks.filter(el => el.isDone)
    }

    if (filterTasks === 'Completed') {
        filterTask = props.tasks.filter(el => !el.isDone)
    }

    // filterTasks === 'All'
    //     ? props.tasks
    //     : filterTasks === 'Active'
    //         ? props.tasks.filter(el => el.isDone)
    //         : filterTasks === 'Completed'
    //             ? props.tasks.filter(el => !el.isDone)
    //             : props.tasks

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {filterTask.map(el => {
                        return (
                            <li key={el.id}>
                                <button onClick={() => props.removeTask(el.id)}>X</button>
                                <input type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <button onClick={() => filteredTasks('All')}>All</button>
                <button onClick={() => filteredTasks('Active')}>Active</button>
                <button onClick={() => filteredTasks('Completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;
