import React, { useState } from "react";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = async () => {
    try {
      const url = isLogin ? "login" : "signup";

      // API calls kept same logic, only body format fixed
      const response = await axios.post(
        `http://localhost:8000/${url}`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message || "Success");

      if (isLogin) {
        setUser(response.data);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const logout = () => {
    setUser(null);
    setUsername("");
    setPassword("");
    setMessage("");
    setIsLogin(true);
  };

  if (user) {
    return (
      <div style={styles.pageBg}>
        <div style={styles.container}>
          <div style={styles.navbar}>
            <h2 style={styles.brand}>
              Green<span style={{ fontStyle: "italic" }}>Sprout</span>
            </h2>
            <button style={styles.logoutBtn} onClick={logout}>
              Sign Out
            </button>
          </div>

          <div style={styles.heroSection}>
            <p style={styles.tag}>WELCOME BACK</p>
            <h1 style={styles.heroTitle}>
              🎉 Welcome, <br />
              <span style={{ color: "#3b6d11" }}>{user.username}</span>
            </h1>
            <p style={styles.subText}>Your account is successfully logged in.</p>
          </div>

          <div style={styles.card}>
            <h3>User Details</h3>
            <p>
              <strong>User ID:</strong> {user.user_id}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageBg}>
      <div style={styles.container}>
        <div style={styles.navbar}>
          <h2 style={styles.brand}>
            Green<span style={{ fontStyle: "italic" }}>Sprout</span>
          </h2>
        </div>

        <div style={styles.heroSection}>
          <p style={styles.tag}>FRESH LOGIN EXPERIENCE</p>
          <h1 style={styles.heroTitle}>
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p style={styles.subText}>
            {isLogin
              ? "Sign in to continue your journey"
              : "Join us and grow something great"}
          </p>
        </div>

        <div style={styles.authBox}>
          <h2 style={styles.formTitle}>{isLogin ? "Login" : "Signup"}</h2>

          <input
            style={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.primaryBtn} onClick={handleSubmit}>
            {isLogin ? "Login" : "Signup"}
          </button>

          {message && <p style={styles.message}>{message}</p>}

          <p style={styles.switchText}>
            {isLogin ? "New here?" : "Already have an account?"}
          </p>

          <button
            style={styles.secondaryBtn}
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
          >
            Switch to {isLogin ? "Signup" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageBg: {
    minHeight: "100vh",
    background: "#f5f4f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },

  container: {
    width: "100%",
    maxWidth: "900px",
    background: "#ffffff",
    borderRadius: "18px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 28px",
    borderBottom: "1px solid #e5e5e5",
  },

  brand: {
    margin: 0,
    color: "#3b6d11",
    fontSize: "28px",
  },

  heroSection: {
    background: "#eaf3de",
    padding: "40px 30px",
  },

  tag: {
    fontSize: "12px",
    fontWeight: 600,
    letterSpacing: "1px",
    color: "#3b6d11",
    marginBottom: "10px",
  },

  heroTitle: {
    margin: 0,
    fontSize: "42px",
    lineHeight: 1.2,
    color: "#173404",
  },

  subText: {
    marginTop: "12px",
    color: "#4f4f4f",
    fontSize: "15px",
  },

  authBox: {
    padding: "35px 30px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  formTitle: {
    margin: 0,
    marginBottom: "10px",
    color: "#173404",
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #d9d9d9",
    fontSize: "15px",
    outline: "none",
  },

  primaryBtn: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#3b6d11",
    color: "white",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #d0d0d0",
    background: "transparent",
    cursor: "pointer",
    fontSize: "14px",
  },

  switchText: {
    textAlign: "center",
    margin: 0,
    color: "#666",
    fontSize: "14px",
  },

  message: {
    textAlign: "center",
    color: "#3b6d11",
    fontWeight: 600,
  },

  logoutBtn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    background: "#3b6d11",
    color: "white",
    cursor: "pointer",
  },

  card: {
    margin: "30px",
    padding: "24px",
    borderRadius: "16px",
    background: "#f7f7f5",
    border: "1px solid #ececec",
  },
};

export default App;

