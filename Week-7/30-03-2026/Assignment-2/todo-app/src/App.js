import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput("");
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));

  const handleKey = (e) => { if (e.key === "Enter") addTask(); };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">📝 Todo List</h1>
        <p className="subtitle">{tasks.length} task{tasks.length !== 1 ? "s" : ""} total</p>

        <div className="input-row">
          <input
            className="input"
            type="text"
            placeholder="Enter a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="add-btn" onClick={addTask}>Add</button>
        </div>

        <ul className="task-list">
          {tasks.length === 0 && (
            <li className="empty">No tasks yet. Add one above!</li>
          )}
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? "done" : ""}`}>
              <span className="checkbox" onClick={() => toggleTask(task.id)}>
                {task.completed ? "☑" : "☐"}
              </span>
              <span className="task-text">{task.text}</span>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <p className="summary">
            ✅ {tasks.filter(t => t.completed).length} done &nbsp;·&nbsp;
            ⏳ {tasks.filter(t => !t.completed).length} remaining
          </p>
        )}
      </div>
    </div>
  );
}

export default App;