function TodoItem({ todo, completed, onComplete, onDelete }) {
  return (
    <div
      className={`p-5 rounded-lg border shadow-sm flex justify-between items-start transition ${
        completed
          ? "bg-gray-50 border-green-300"
          : "bg-white border-gray-200"
      }`}
    >
      <div>
        <h3
          className={`font-medium text-lg ${
            completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {todo.title}
        </h3>
        <p
          className={`mt-1 text-sm ${
            completed ? "line-through text-gray-400" : "text-gray-600"
          }`}
        >
          {todo.description}
        </p>
      </div>

      <div className="flex gap-2">
        {!completed && (
          <button
            onClick={onComplete}
            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm"
          >
            Complete
          </button>
        )}
        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
