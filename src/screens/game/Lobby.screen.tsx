import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/authContext";
import { TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";
import { listGames, createGame, joinGame } from "../../api";
import GameListItem from "../../components/GameListItem";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthRouteNames, GameRouteNames, UserRouteNames } from "../../router/route-names";

const Container = styled(SafeAreaView)`
  display: flex;
  flex: 1;
  padding: 0 8px;
`;

const GameList = styled.ScrollView``;

const LobbyScreen = () => {
  const auth = useAuth();
  const [games, setGames] = useState<any[]>([]);
  useEffect(() => {
    listGames(auth.token).then(setGames);
   
  }, []);
  const navigation = useNavigation<any>();

  //console.log(games);

  const handleAddGame = async () => {
    try {
      const newGame = await createGame(auth.token);
      await listGames(auth.token).then(setGames);
      gotoNewGame(newGame);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const handleJoinGame = async (gameId: string) => {
    try {
      await joinGame(auth.token, gameId);
      navigation.navigate(GameRouteNames.TABLE, { gameId })
      await listGames(auth.token).then(setGames);
      console.log("Joined game");
    } catch (error) {
      console.error("Error joining game:", error);
    }
  };

  const gotoNewGame = (game) => {
    navigation.navigate(GameRouteNames.TABLE, { gameId: game.id });
  };

  

  return (
    <Container>
      <TouchableOpacity onPress={handleAddGame}  style={{ marginBottom: 10 }}>
        <Text>Create Game</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={auth.logout} style={{ marginBottom: 10 }}>
        <Text>Logout</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => {
        navigation.navigate(UserRouteNames.PROFILE);
      }}>
        <Text>Profile</Text>
      </TouchableOpacity>



      <GameList>
        {games.map((game) => (
          <GameListItem
            status={game.status}
            id={game.id}
            player1={game.player1 ? game.player1.email : 'Unknown Player'}
            player2={game.player2 ? game.player2.email : 'Unknown Player'}
            key={game.id}
            onPress={() => {
              if (game.status === 'CREATED') {
                handleJoinGame(game.id);
              } else {
                navigation.navigate(GameRouteNames.TABLE, { gameId: game.id });
              }
            }}
          />
        ))}
      </GameList>
    </Container>
  );
};

export default LobbyScreen;

