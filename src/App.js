import React, {useEffect, useState} from 'react';
import './App.css';
import {v4} from 'uuid';
import { randomColor } from 'randomcolor';
import Draggable from 'react-draggable';
import deleteIcon from './assets/delete.png'

function App() {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks]);

  const newTask = () => {
    if (task.trim() !== '') {
      const newTask = {
        id: v4(),
        text: task,
        color: randomColor({ luminosity: 'light'}),
        defaultPosition: {
          x: Math.random() * (700 - 300) + 300,
          y: Math.random() * (700 - 400) - 700
        }
      }
      setTasks(tasks => [...tasks, newTask])
      setTask('')
      setError('')
    } else {
      setError('Nothing to create...')
    }
  }
  const deleteTask = (id) => {
    setTasks(tasks => tasks.filter(task => task.id !== id))
  }

  const updatePosition = (data, id) => {
    setTasks(tasks => tasks
      .map(task => (task.id === id)
        ? {
        ...task,
        defaultPosition: {
          x: data.x,
          y: data.y
        }
      }
      : task
      )
    )
  }

  return (
    <div>
      <div className='wrapper'>
        <input
          className={ error ? 'input error' : 'input'}
          type='text'
          placeholder={error ? error : 'Add new task'}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onFocus={() => setError('')}
          onKeyPress={(e) => (e.key === 'Enter') ? newTask() : null}
        />
        <button
          className='enter'
          onClick={newTask}
        >
          Enter
        </button>
      </div>
      {
        tasks.map((task, index) => {
          return (
            <Draggable
              key={index}
              defaultPosition={task.defaultPosition}
              onStop={(e, data) => updatePosition(data, task.id)}
            >
              <div className='task' style={{backgroundColor: task.color}}>
                {task.text}
                <img
                  className='delete'
                  onClick={() => deleteTask(task.id)}
                  src={deleteIcon}
                  alt=''/>
              </div>
            </Draggable>
          )
        })
      }
    </div>

  );
}

export default App;
