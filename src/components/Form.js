import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) => {
      return todo.id === id ? { title, id, completed } : todo;
    });

    setTodos(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!editTodo) {
      const newTodos = [
        ...todos,
        { id: uuidv4(), title: input, completed: false },
      ];
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  };
  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Enter a task"
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="button-add" tyoe="submit">
        {editTodo ? "Edit" : "Add"}
      </button>
    </form>
  );
};

export default Form;
