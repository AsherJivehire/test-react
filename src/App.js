import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";

const LOAL_STORAGE_KEY = 'todoApp.todos'
function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOAL_STORAGE_KEY))
    if (storedTodos)
      setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleAppTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return 
    setTodos(prevTodos => {
      return [...prevTodos, {
        id: randomNumberInRange(1, 100000),
         name: name, complete: false
      }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAppTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
