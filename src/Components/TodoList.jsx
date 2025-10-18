import TodoItem from "./TodoItem";

function TodoList({ title, todos, onComplete, onDelete, completed }) {
  return (
    <div className="mt-8">
      <h2
        className={`text-2xl font-semibold mb-4 ${
          completed ? "text-green-600" : "text-blue-600"
        }`}
      >
        {title}
      </h2>

      {todos.length === 0 ? (
        <p className="text-gray-500 italic">No tasks here</p>
      ) : (
        <div className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              completed={completed}
              onComplete={onComplete ? () => onComplete(todo.id) : null}
              onDelete={() => onDelete(todo.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
