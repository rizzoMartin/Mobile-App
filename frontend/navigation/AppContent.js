import React from 'react';
import { useAuth } from '../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import LoginNav from './LoginNav';
import LoggedNav from './LoggedNav';
const AppContent = () => {
    const { user } = useAuth();
  
    return(
      <NavigationContainer>
        {user !== null ? <LoggedNav/> : <LoginNav/>}
      </NavigationContainer>
    );
}

export default AppContent;