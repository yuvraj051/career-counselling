import React, { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard</h2>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <img src={user.picture} alt="Profile" />
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
}

export default Dashboard;
