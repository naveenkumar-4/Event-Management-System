// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import authAxios from '../services/authAxios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await authAxios().get('http://localhost:4000/api/auth/me');
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error.response.data.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
