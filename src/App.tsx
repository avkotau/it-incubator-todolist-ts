import React, { useState } from 'react';
import './App.css';
import TodoList from "./TodoList/TodoList";

function App(): JSX.Element {

    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML and CSS', isDone: true},
        {id: 2, title: 'HTML and SCSS', isDone: true},
        {id: 3, title: 'JS and TS', isDone: false},
    ])

    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id))
    }

    return (
        <div className="App">
            <TodoList title='What to do'
                      tasks={tasks}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
