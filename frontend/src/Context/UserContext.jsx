// src/Context/UserContext.js

import React, { createContext, useContext, useState } from "react";

// 1. Context બનાવો
const UserContext = createContext();

// 2. Provider Component બનાવો
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // શરૂઆતમાં user null રહેશે

  // user ની માહિતી set કરવા માટે એક ફંક્શન
  const loginUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom hook બનાવો જેથી context ને વાપરવું સહેલું બને
export const useUser = () => {
  return useContext(UserContext);
};
