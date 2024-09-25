import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  // Load todos from local storage on first render
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to local storage whenever the todos array changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (todo.trim()) { 
      const newTodo = { text: todo, completed: false }; 
      setTodos([...todos, newTodo]); 
      setTodo(''); 
    }
  }

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((element, i) => i !== index);
    setTodos(updatedTodos);
  }

  const editTodo = (index) => {
    const newTodo = prompt('Edit your todo', todos[index].text); 
    if (newTodo && newTodo.trim()) { 
      const updatedTodos = [...todos];
      updatedTodos[index].text = newTodo; 
      setTodos(updatedTodos);
    }
  }

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = true; 
    setTodos(updatedTodos);
  }

  return (
    <>
      <div className='container'>
        <div>
          <h1>TODO APP</h1>
        </div>
        <div className='add-todo'>
          <div>
            <h2>Add Task</h2>
          </div>
          <div className='input-button'>
            <input
              className='todo-input'
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)} 
            />
            <button onClick={addTodo}>ADD</button>
          </div>
        </div>
        <p>Your Todos...</p>
        {todos.map((todoItem, index) => (
          <div className="todos" key={index}>
            <div className='todo-list'>
              <input
                className='checkbox'
                type="checkbox"
                checked={todoItem.completed}
                onChange={() => toggleComplete(index)}
                disabled={todoItem.completed}
              />
              <p className='todonames'
                style={{ textDecoration: todoItem.completed ? 'line-through' : 'none' }}
              >
                {todoItem.text} 
              </p>
              <div className='buttons'>
                <button onClick={() => editTodo(index)} disabled={todoItem.completed}>Edit</button>
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App;
