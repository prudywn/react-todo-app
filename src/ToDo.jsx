import React, {useState, useEffect} from 'react'
import './ToDo.css'

export default function ToDo() {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    //const [editing, setEditing] = useState(null)
  
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'))
        if (savedTasks) {
            setTasks(savedTasks)
            }
    }, [])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
        }, [tasks])
    
    const addTask = () => {
        if(newTask.trim() !== ''){
            setTasks([...tasks, {text: newTask, completed: false
                }])
            setNewTask('')
        }
    }

    const removeTask = (index) => {
        const newTasks = tasks.filter((_,i) => i !== index)
        setTasks(newTasks)
    }

    const toggleComplete = (index) => {
        const newTasks = tasks.map((task, i) => (
            i === index ? {...task, completed: !task.completed} : task
            ))
            setTasks(newTasks)
        
    }

  return (
    <div className='todo-container'>
        <h1> React ToDo List</h1>
        <div className='input-container'>
            <input type='text' value={newTask} onChange={(e) => setNewTask
            (e.target.value)} placeholder='Add task'/>
            <button onClick={addTask}>Add Task</button>

        </div>
        <ul>
           {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed': ''}>
                <input type='checkbox' checked={task.completed} onChange={() => toggleComplete(index)}/>
                <span onClick={() => toggleComplete(index)}>{task.text}</span>
                <button onClick={() => removeTask(index)}>Remove</button>
            </li>
           ))} 
        </ul>
    </div>
  )
}
