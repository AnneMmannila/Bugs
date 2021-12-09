import React, { useState, createContext, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import FrontPage from "./components/FrontPage";
import Favorites from "./components/Favorites";
import FindBugs from "./components/FindBugs";
import ProfilePage from "./components/ProfilePage";
import { Entypo } from "@expo/vector-icons";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import BugMap from "./components/BugMap";
import 'react-native-gesture-handler';
import { store } from "./components/LoginRedux";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from \'@react-native-async-storage/async-storage\' instead of \'react-native\'. See https://github.com/react-native-async-storage/async-storage']);


export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Update state from redux
  store.subscribe(() => {
    setIsLoggedIn(store.getState());
  })

  

  return (
   
    <NavigationContainer>
      {isLoggedIn ?
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            height: 60,
            backgroundColor: "#3CB371",
        },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Favorites") {
              iconName = "heart";
            } else if (route.name === "FindBugs") {
              iconName = "bug";
            } else if (route.name === "Profile") {
              iconName = "cog";
            }else if (route.name === 'Map'){
              iconName= 'globe'
            }

            return <Entypo name={iconName} size={30} color={color}/>;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "#696969",
        })}
      >
        <Tab.Screen name="Home" component={FrontPage} 
        options={{ headerStyle: {
          backgroundColor: "#3CB371",
        },
        headerTitle:''}}/>
        <Tab.Screen name="Favorites" component={Favorites} 
        options={{ headerStyle: {
          backgroundColor: "#3CB371",
        },
        headerTitle:''}}/>
        <Tab.Screen name="FindBugs" component={FindBugs} 
        options={{ headerStyle: {
          backgroundColor: "#3CB371",
        },
        headerTitle:''}}/>
        <Tab.Screen name= 'Map' component = {BugMap} 
        options={{ headerStyle: {
          backgroundColor: "#3CB371",
        },
        headerTitle:''}}/>
        <Tab.Screen name="Profile" component={ProfilePage} 
        options={{ headerStyle: {
          backgroundColor: "#3CB371",
        },
        headerTitle:''}}/>
      </Tab.Navigator>
      
      : 
      <Stack.Navigator>
        <Stack.Screen name = 'Login' component={Login}
        options={{
          headerStyle: {
            backgroundColor: "#3CB371",
          },
          headerTitle:'',}}/>
        <Stack.Screen name = 'Sign Up' component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: "#3CB371",
          },
          headerTitle:'',
          headerLeft: null}}/>
      </Stack.Navigator>
}
    </NavigationContainer>
  
  );
}
