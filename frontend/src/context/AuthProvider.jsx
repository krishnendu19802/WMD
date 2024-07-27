import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState([false]);
  const [loaded,setLoaded]=useState(true)
  const login = (data) => {
    setIsAuthenticated([true, data]);
  };

  const logout = () => {
    setIsAuthenticated([false]);
  };
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchdatalogin = async () => {
    const token = localStorage.getItem('whosmydoc')
    // console.log(token)
    if (token) {
      const headers = {
        "Authorization": `Bearer ${token}`
      };
      await axios.post(`${backendUrl}/login`, {}, { headers }).then((result) => {
        console.log(result.data)
        const { status, user } = result.data
        setIsAuthenticated([true, user])
      }).catch((error) => {
        console.log(error)
      })
      setLoaded(false)
    }
  }
  useEffect(() => {
    fetchdatalogin()
  }, [])
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout,loaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };