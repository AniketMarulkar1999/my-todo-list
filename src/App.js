import React, {useEffect, useState} from 'react';
import Form from './components/Form';
import './App.css';
import TodoList from './components/TodoList';


function App() {

  const LOCAL_STORAGE_KEY = "todolists";

  const [input, setInput] = useState("");
  const [details, setDetails] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    const retrieveTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log("Retrieved todos: ", retrieveTodos);
    if(retrieveTodos)
    {
      setTodos(retrieveTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <div className='header'>
        <h2>ToDo List</h2>
      </div>
      <div className='body-container'>
        <div className='todo-form-box'>
          <Form
              input={input}
              setInput={setInput}
              details={details}
              setDetails={setDetails}
              todos={todos}
              setTodos={setTodos}
              editTodo={editTodo}
              setEditTodo={setEditTodo}
          />
        </div>
        <div className='todo-list-box'>
            <TodoList
                todos={todos}
                setTodos={setTodos}
                setEditTodo={setEditTodo} 
            />
        </div>
      </div>
    </div>
  );
}

export default App;
