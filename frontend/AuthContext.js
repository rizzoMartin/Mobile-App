import React, { createContext, useContext, useState } from 'react';

// Crear el Context
const AuthContext = createContext();

// Crear un hook personalizado para facilitar el uso del Context
export function useAuth() {
  return useContext(AuthContext);
}

// Componente proveedor
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};