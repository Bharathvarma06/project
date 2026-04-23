import React, { useState } from "react";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = async () => {
    const url = isLogin ? "login" : "signup";

    try {
      const res = await axios.post(`http://api-gateway:8000/${url}`, {
        username: username,
        password: password
      });

      setMessage(res.data.message);

      if (url === "login") {
        setUser(res.data);
      }
    } catch (err) {
      setMessage(err.response?.data?.detail || "Error occurred");
    }
  };

  // 🎉 After login screen
  if (user) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>🎉 Welcome {user.username}</h1>
        <p>User ID: {user.user_id}</p>

        <button onClick={() => setUser(null)}>Logout</button>
      </div>
    );
  }

  // 🔐 Login / Signup screen
  return (
    <div style={{ padding: "20px" }}>
      <h1>🔐 {isLogin ? "Login" : "Signup"}</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>
        {isLogin ? "Login" : "Signup"}
      </button>

      <p>{message}</p>

      <button onClick={() => {
        setIsLogin(!isLogin);
        setMessage("");
      }}>
        Switch to {isLogin ? "Signup" : "Login"}
      </button>
    </div>
  );
}

export default App;
