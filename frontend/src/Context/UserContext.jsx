import { createContext, useState, useContext } from "react";

// 1️⃣ Create Context
const UserContext = createContext();

// 2️⃣ Create Provider
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // null = not logged in

  const login = (userData) => {
    setUser(userData);
    // you can also save userData in localStorage/sessionStorage here
  };

  const logout = () => {
    setUser(null);
    // remove user data from localStorage/sessionStorage if used
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
      {/* create */}
    </UserContext.Provider>
  );
}

// 3️⃣ Custom Hook (optional but recommended)
export function useUser() {
  return useContext(UserContext);
}
