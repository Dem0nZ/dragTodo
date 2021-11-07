import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  console.log(task);
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks]);
  
  const newTask = () => {
    
  }

  return (
      <div className='wrapper'>
        <input
          type='text'
          placeholder='Add new task'
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className='enter'
          onClick={newTask}
        >
          Enter
        </button>
      </div>
  );
}

export default App;
