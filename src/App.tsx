import { useEffect, useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './components/TodoList/TodoList';
import { v1 } from "uuid";
import axios from "axios";

function App(): JSX.Element {

    let [tasks, setTasks] = useState<TaskType[]>([
        // {id: '1', title: "Html", completed: true},
        // {id: '2', title: "Css", completed: true},
        // {id: '3', title: "Redux", completed: true},
    ]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then((res) => {
                setTasks(res.data)

            })
    }, [])

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function deleteAllTasks() {
        setTasks([]);
    }

    const addTask = (task: string) => {

        if (task.trim().length > 0) {
            setTasks([{id: v1() as string, title: task, completed: true}, ...tasks]);
        }
    }

    const clickCheckbox = (newId: string, e: boolean) => {
        // console.log(newId, e)

        //request server  update task id status

        // ok

        // if ok
        setTasks([...tasks.map(t => t.id === newId ? {...t, completed: e} : t)])
    }

    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      deleteAllTasks={deleteAllTasks}
                      addTask={addTask}
                      clickCheckbox={clickCheckbox}
            />
        </div>
    );
}

export default App;
