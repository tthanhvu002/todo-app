import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [todo, setTodo] = useState("");
  const [isEdit, setIsEdit] = useState({
    isShowing: false,
    currentId: 0,
    editValue: "",
  });

  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (todo.trim()) {
      if (
        todos.find(
          (item) =>
            item.title.toLowerCase().trim() === todo.toLowerCase().trim()
        )
      ) {
        toast("Duplicate");
      } else {
        setTodos([...todos, { id: Date.now(), title: todo }]);
        setTodo("");
      }
    } else {
      toast("Error");
    }
  };

  const delTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const showEdit = (todo) => {
    setIsEdit({ isShowing: true, currentId: todo.id, editValue: todo.title });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  console.log(isEdit);

  const updateTodo = () => {
    if (isEdit.editValue.trim()) {
      // falsy: false, 0, '', undefinde, isNaN, null - truthy: con lai
      if (
        todos.find(
          (item) =>
            item.title.toLowerCase().trim() ===
              isEdit.editValue.toLowerCase().trim() &&
            isEdit.currentId !== item.id
        )
      ) {
        toast("Duplicate");
      } else {
        const newTodos = todos.map((todo) =>
          todo.id === isEdit.currentId
            ? { ...todo, title: isEdit.editValue }
            : todo
        );
        setTodos(newTodos);
        setIsEdit({ isShowing: false, currentId: 0, editValue: "" });
      }
    }
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="todo-action d-flex gap-2">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
        />
        <button className="add-btn btn btn-primary" onClick={addTodo}>
          ADD
        </button>
      </div>
      <ToastContainer position="top-center" closeOnClick theme="light" />
      <ul className="todo-list d-flex flex-column">
        {todos.map((todoItem, index) => {
          return (
            <li key={index} className="todo-item d-flex">
              {isEdit.isShowing && isEdit.currentId === todoItem.id ? (
                <input
                  type="text"
                  className="form-control"
                  ref={inputRef}
                  onChange={(e) =>
                    setIsEdit({ ...isEdit, editValue: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") updateTodo();
                  }}
                  value={isEdit.editValue}
                />
              ) : (
                <>{todoItem.title}</>
              )}

              <div className="d-flex align-items-center gap-2">
                {isEdit.isShowing && isEdit.currentId === todoItem.id ? (
                  <button
                    onClick={() => {
                      setIsEdit(false);
                      setTodo("");
                    }}
                    className="btn btn-danger"
                  >
                    CANCEL
                  </button>
                ) : (
                  <button
                    onClick={() => showEdit(todoItem)}
                    className="btn btn-warning"
                  >
                    EDIT
                  </button>
                )}
                {isEdit.isShowing && isEdit.currentId === todoItem.id ? (
                  <button onClick={updateTodo} className="btn btn-success">
                    SAVE
                  </button>
                ) : (
                  <button
                    onClick={() => delTodo(todoItem.id)}
                    className="btn btn-danger"
                  >
                    DEL
                  </button>
                )}
              </div>
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
