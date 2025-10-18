import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("completed");
    return saved ? JSON.parse(saved) : [];
  });

  // which tab is active ("todos" or "completed")
  const [view, setView] = useState("todos");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [completed]);

  const addTodo = (title, description) => {
    if (title.trim() === "" || description.trim() === "") return;
    const newTodo = { id: Date.now(), title, description };
    setTodos([...todos, newTodo]);
  };

  const completeTodo = (id) => {
    const todoToComplete = todos.find((todo) => todo.id === id);
    if (todoToComplete) {
      setCompleted([...completed, todoToComplete]);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteCompleted = (id) => {
    setCompleted(completed.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          📝 To-Do App
        </h1>

        {/* Only show form in To-Do view */}
        {view === "todos" && <TodoForm addTodo={addTodo} />}

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setView("todos")}
            className={`px-4 py-2 rounded-lg font-medium ${
              view === "todos"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            📌 To-Do List
          </button>
          <button
            onClick={() => setView("completed")}
            className={`px-4 py-2 rounded-lg font-medium ${
              view === "completed"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            ✅ Completed
          </button>
        </div>

        {/* Render List */}
        {view === "todos" ? (
          <TodoList
            title="📌 Active Tasks"
            todos={todos}
            onComplete={completeTodo}
            onDelete={deleteTodo}
          />
        ) : (
          <TodoList
            title="✅ Completed Tasks"
            todos={completed}
            completed
            onDelete={deleteCompleted}
          />
        )}
      </div>
    </div>
  );
}

export default App;
