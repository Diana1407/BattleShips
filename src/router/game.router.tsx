import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GameRouteNames, UserRouteNames } from "./route-names";
import { Text } from "react-native";
import LobbyScreen from "../screens/game/Lobby.screen";
import TableScreen from "../screens/game/Table.screen";
import ProfileScreen from "../screens/user/Profile.screen";
import JoinLobbyScreen from "../screens/game/JoinLobby.screen";

const GameStack = createNativeStackNavigator();

const gameRoutes = (
  <GameStack.Navigator
    initialRouteName="Lobby"
    screenOptions={{
      headerStyle: { backgroundColor: "#B3D8FA" },
    }}
  >
    <GameStack.Screen name={GameRouteNames.LOBBY} component={LobbyScreen} />

    <GameStack.Screen
      name={GameRouteNames.TABLE}
      component={TableScreen}
      options={{
        headerTitle: (props) => <Text {...props}>Game</Text>,
      }}
    />

    <GameStack.Screen
      name={GameRouteNames.JOINLOBBY}
      component={JoinLobbyScreen}
    />

    <GameStack.Screen
      name={UserRouteNames.PROFILE}
      component={ProfileScreen}
      options={{
        headerTitle: (props) => <Text {...props}>Profile</Text>,
      }}
    ></GameStack.Screen>
  </GameStack.Navigator>
);

export default gameRoutes;
