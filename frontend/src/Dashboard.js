function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Welcome 🎉</h1>
      <p>User ID: {user?.user_id}</p>
    </div>
  );
}

export default Dashboard;
