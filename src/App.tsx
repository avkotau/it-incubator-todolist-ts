import { useEffect, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/TodoList/Todolist';
import { v1 } from "uuid";
import axios from "axios";

function App(): JSX.Element {

    let [tasks, setTasks] = useState<TaskType[]>([
        // {id: '', title: "", completed: true},
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
