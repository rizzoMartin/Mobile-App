import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'

const LoggedNav = () => {
    const Tab = createBottomTabNavigator();
    return(
      <Tab.Navigator initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
    
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'
          }
    
          // Puedes retornar cualquier componente aquí que quieras usar como ícono
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#DECDF5',
        tabBarInactiveTintColor: '#656176',
        tabBarShowLabel: false,
      })}
      >
        <Tab.Screen name="Settings" options={{ headerShown: false }} component={SettingsScreen} />
        <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Tab.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
      </Tab.Navigator>
    );
  }

  export default LoggedNav;