import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JoinLobbyScreen from "../screens/game/JoinLobby.screen";
import TableScreen from "../screens/game/Table.screen";

const Stack = createNativeStackNavigator();

const JoinGamesNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="JOINLOBBY"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Join Games" component={JoinLobbyScreen} />
      <Stack.Screen name="Table" component={TableScreen} />
    </Stack.Navigator>
  );
};

export default JoinGamesNavigator;
