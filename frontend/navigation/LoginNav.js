import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from '../screens/UserScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const LoginNav = () => {
    const Stack = createNativeStackNavigator();
    return(
      <Stack.Navigator initialRouteName="User">
        <Stack.Screen name="User" options={{ headerShown: false }} component={UserScreen} />
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
        <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
      </Stack.Navigator>
    );
  }

  export default LoginNav;