import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from '../screens/SettingsScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import LevelSelectionScreen from '../screens/LevelSelectionScreen';
import LevelScreen from '../screens/LevelScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BarNav = () => {
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

const LoggedNav = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="BarNav" options={{ headerShown: false }} component={BarNav} />
      <Stack.Screen name="LevelSelection" options={{ headerTitle: '' }} component={LevelSelectionScreen} />
      <Stack.Screen name="Level" options={{ headerShown: false }} component={LevelScreen} />
  </Stack.Navigator>
  );    
}

export default LoggedNav;