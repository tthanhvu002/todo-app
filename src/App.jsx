import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")));
  const [todo, setTodo] = useState("");
  /* const storedTodos = JSON.parse(localStorage.getItem("todos"));
  if (storedTodos) {
    setTodos(storedTodos);
  } */
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), title: todo }]);
      setTodo("");
    }
  };

  const delTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  /*  const updateTodo = (id, newTitle) => {
    const updatedTodos = todos.map(todo => {
      if(todo.id == id){
        return {...todo, title: newTitle }
      }
      return todo
    })
    setTodos(updatedTodos)
  } */
  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="todo-action d-flex gap-2">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button className="add-btn btn btn-primary" onClick={() => addTodo()}>
          ADD
        </button>
      </div>
      <ul className="todo-list d-flex flex-column">
        {todos.map((todoItem, index) => {
          return (
            <li key={index} className="todo-item d-flex">
              {todoItem.title}
              <button
                onClick={() => delTodo(todoItem.id)}
                className="del-btn btn "
              >
                DEL
              </button>
            </li>
          );
        })}
      </ul>
      <div className="todo-detail d-flex align-items-center justify-content-between">
        <p>You have {todos.length} pending task</p>
        <button className="clear-all-btn" onClick={() => setTodos([])}>
          Clear All
        </button>
      </div>
    </div>
  );
}

export default App;
