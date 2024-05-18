import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/authContext";
import { TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";
import { listGames, joinGame } from "../../api";
import GameListItem from "../../components/GameListItem";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AuthRouteNames,
  GameRouteNames,
  UserRouteNames,
} from "../../router/route-names";
import gameRoutes from "../../router/game.router";

const Container = styled(SafeAreaView)`
  display: flex;
  flex: 1;
  padding: 0 8px;
`;

const GameList = styled.ScrollView``;

const JoinLobbyScreen = () => {
  const auth = useAuth();
  const [joinGames, setJoinGames] = useState<any[]>([]);
  useEffect(() => {
    listGames(auth.token).then(setJoinGames);
  }, []);
  const navigation = useNavigation<any>();

  //console.log(games);

  const handleJoinGame = async (gameId: string) => {
    try {
      await joinGame(auth.token, gameId);
      navigation.navigate("Table", { gameId });
      await listGames(auth.token).then(setJoinGames);
      console.log("Joined game");
    } catch (error) {
      console.error("Error joining game:", error);
    }
  };

  return (
    <Container>
      <GameList>
        {joinGames
          .filter((game) => game.status === "CREATED")
          .map((game) => (
            <GameListItem
              status={game.status}
              id={game.id}
              player1={game.player1 ? game.player1.email : "Unknown Player"}
              player2={game.player2 ? game.player2.email : "Unknown Player"}
              key={game.id}
              onPress={() => {
                handleJoinGame(game.id);
              }}
            />
          ))}
      </GameList>
    </Container>
  );
};

export default JoinLobbyScreen;
