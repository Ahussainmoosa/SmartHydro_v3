import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import pages
import AccountScreen from "../screens/AccountScreen";
import DashboardScreen from "../screens/DashboardScreen";
import LoginScreen from "../screens/LoginScreen";
import PlantsScreen from "../screens/PlantsScreen";
import SignupScreen from "../screens/SignupScreen";
import SplashScreen from "../screens/SplashScreen";
import MainTabs from "./MainTabs";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown:false }}>
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Dashboard" component={DashboardScreen}/>
        <Stack.Screen name="Plants" component={PlantsScreen}/>
        <Stack.Screen name="MainTabs" component={MainTabs}/>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}