import { useState } from "react";
import "./App.css";

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <div className={isDark ? "app dark" : "app light"}>
      <div className="card">
        <div className="icon">{isDark ? "🌙" : "☀️"}</div>
        <h1 className="mode-label">
          Mode: <span>{isDark ? "Dark" : "Light"}</span>
        </h1>
        <p className="mode-description">
          {isDark ? "Easy on the eyes. Perfect for night." : "Bright and clear. Great for daytime."}
        </p>
        <button className="toggle-btn" onClick={toggleTheme}>
          {isDark ? "Switch to Light Mode ☀️" : "Switch to Dark Mode 🌙"}
        </button>
      </div>
    </div>
  );
}

export default App;