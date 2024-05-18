import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LobbyScreen from "../screens/game/Lobby.screen";
import TableScreen from "../screens/game/Table.screen";
import { Text } from "react-native-elements";

const Stack = createNativeStackNavigator();

const LobbyNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LOBBY"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="LOBBY" component={LobbyScreen} />
      <Stack.Screen
        name="Table"
        component={TableScreen}
        options={{ headerTitle: (props) => <Text {...props}>Game</Text> }}
      />
    </Stack.Navigator>
  );
};

export default LobbyNavigator;
