import { useState } from "react";
import "./TodoList.css";

export default function TodoList({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos || []); // [1

  // Funkcja do generowania unikalnych identyfikatorów zadań
  const generateId = () => {
    return Math.max(...todos.map((todo) => todo.id)) + 1;
  };

  // Funkcja do dodawania nowego zadania
  const addTodo = (text) => {
    const newTodo = { id: generateId(), text, done: false };
    setTodos([...todos, newTodo]);
  };

  // Funkcja do usuwania zadania
  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  // Funkcja do zmiany statusu zadania
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  // Funkcja do renderowania listy zadań
  const renderTodos = () => {
    return todos.map((todo, index) => (
      <li key={todo.id}>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleTodo(todo.id)}
        />
        <span
          style={{
            textDecoration: todo.done ? "line-through" : "none",
          }}
        >
          {todo.text}
        </span>
        <button
          data-testid={`deleteTodoButton-${index + 1}`}
          onClick={() => deleteTodo(todo.id)}
        >
          X
        </button>
      </li>
    ));
  };

  // Funkcja do obsługi formularza dodawania zadania
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.todo;
    const text = input.value.trim();
    if (text) {
      addTodo(text);
      input.value = "";
    }
  };

  return (
    <div className="todo-list">
      <h1>Lista zadań</h1>
      <form className="todo-list__form" onSubmit={handleSubmit}>
        <input
          data-testid="todoInput"
          type="text"
          name="todo"
          placeholder="Wpisz zadanie"
        />
        <button data-testid="addTodoButton" type="submit">
          Dodaj
        </button>
      </form>
      <ul>{renderTodos()}</ul>
    </div>
  );
}
