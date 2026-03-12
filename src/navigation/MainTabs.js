import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

import ControlScreen from "../screens/ControlScreen";
import DashboardScreen from "../screens/DashboardScreen";
import MessageScreen from "../screens/MessageScreen";
import StatsScreen from "../screens/StatsScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs(){

return(

<Tab.Navigator
screenOptions={{
headerShown:false,
tabBarStyle:{
backgroundColor:"#DDE8D8",
height:70
},
tabBarLabelStyle:{
fontSize:12,
marginBottom:8
}
}}
>

<Tab.Screen
name="Home"
component={DashboardScreen}
options={{
tabBarIcon:()=>(<Text>🏠</Text>)
}}
/>

<Tab.Screen
name="Control"
component={ControlScreen}
options={{
tabBarIcon:()=>(<Text>⚙️</Text>)
}}
/>

<Tab.Screen
name="Stats"
component={StatsScreen}
options={{
tabBarIcon:()=>(<Text>⏱</Text>)
}}
/>

<Tab.Screen
name="Messages"
component={MessageScreen}
options={{
tabBarIcon:()=>(<Text>💬</Text>)
}}
/>

</Tab.Navigator>

);

}