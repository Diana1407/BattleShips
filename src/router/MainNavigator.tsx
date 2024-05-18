import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LobbyScreen from "../screens/game/Lobby.screen"; // Your existing LobbyScreen
import JoinLobbyScreen from "../screens/game/JoinLobby.screen"; // Your screen to join games
import ProfileScreen from "../screens/user/Profile.screen"; // Your Profile screen
import Icon from "react-native-vector-icons/FontAwesome"; // Make sure to install this package
import LobbyNavigator from "../navigators/LobbyNavigator";
import JoinGamesNavigator from "../navigators/JoinGamesNavigator";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Lobby") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Join Games") {
              iconName = focused ? "gamepad" : "gamepad";
            } else if (route.name === "Profile") {
              iconName = focused ? "user" : "user";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Lobby" component={LobbyNavigator} />
        <Tab.Screen name="Join Games" component={JoinGamesNavigator} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
};

export default MainNavigator;
