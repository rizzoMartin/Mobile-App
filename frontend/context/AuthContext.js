import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../screens/LoadingScreen';

// Crear el Context
const AuthContext = createContext();

// Crear un hook personalizado para facilitar el uso del Context
export function useAuth() {
  return useContext(AuthContext);
}

// Componente proveedor
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (userData) => {
    try {
      await AsyncStorage.setItem('userLoggedIn', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error guardando los datos del usuario ", error);
    }
    
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userLoggedIn');
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión ", error);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userLoggedIn');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error cargando los datos del usuario ", error);
      }
      setLoading(false);
    };

    loadUserData();
  }, [])

  if(loading) {
    return <LoadingScreen />
  }
  else{
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }
};