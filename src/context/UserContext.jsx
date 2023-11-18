'use client';
import React, { createContext, useState } from 'react';

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({token:"lksdajf;lk",name:"ahmed"});
  const handleSetUserData = (data) => {
    setUser(data);
    localStorage.setItem("current_user",JSON.stringify(data))
  }
  return (
    <UserContext.Provider value={{ user, setUser, handleSetUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider