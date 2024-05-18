import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/authContext";
import { TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";
import { listGames, createGame, joinGame } from "../../api";
import GameListItem from "../../components/GameListItem";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  AuthRouteNames,
  GameRouteNames,
  UserRouteNames,
} from "../../router/route-names";
import JoinLobbyScreen from "./JoinLobby.screen";

const Tab = createMaterialTopTabNavigator();

const Container = styled(SafeAreaView)`
  display: flex;
  flex: 1;
  padding: 0 8px;
`;

const GameList = styled.ScrollView``;

const Button = styled(TouchableOpacity)`
  background-color: #6200ea;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled(Text)`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

const LobbyScreen = () => {
  const auth = useAuth();
  const [games, setGames] = useState<any[]>([]);
  useEffect(() => {
    listGames(auth.token).then(setGames);
  }, []);
  const navigation = useNavigation<any>();

  const handleAddGame = async () => {
    try {
      const newGame = await createGame(auth.token);
      await listGames(auth.token).then(setGames);
      gotoNewGame(newGame);
      console.log("Game created");
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const handleJoinGame = async (gameId: string) => {
    try {
      await joinGame(auth.token, gameId);
      navigation.navigate("Table", { gameId });
      await listGames(auth.token).then(setGames);
      console.log("Joined game");
    } catch (error) {
      console.error("Error joining game:", error);
    }
  };

  const gotoNewGame = (game) => {
    // navigation.navigate(GameRouteNames.TABLE, { gameId: game.id });
    navigation.navigate("Table", { gameId: game.id });
  };

  const Logout = () => {
    useEffect(() => {
      auth.logout();
    }, []);
    return null; // This screen does not render anything, only triggers logout
  };

  return (
    <Container>
      <Button onPress={handleAddGame}>
        <ButtonText>Create Game</ButtonText>
      </Button>

      <GameList>
        {games.map((game) => (
          <GameListItem
            status={game.status}
            id={game.id}
            player1={game.player1 ? game.player1.email : "Unknown Player"}
            player2={game.player2 ? game.player2.email : "Unknown Player"}
            key={game.id}
            onPress={() => {
              if (game.status === "CREATED") {
                handleJoinGame(game.id);
              } else {
                navigation.navigate("Table", { gameId: game.id });
              }
            }}
          />
        ))}
      </GameList>
    </Container>
  );
};

export default LobbyScreen;
