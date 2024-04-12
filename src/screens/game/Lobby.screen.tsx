import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/authContext";
import { TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";
import { listGames, createGame } from "../../api";
import GameListItem from "../../components/GameListItem";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameRouteNames } from "../../router/route-names";

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

  // console.log(games);

  const handleAddGame = async () => {
    await createGame(auth.token);
    await listGames(auth.token).then(setGames);
  };

  return (
    <Container>
      <TouchableOpacity onPress={handleAddGame} style={{ marginBottom: 10 }}>
        <Text>Create Game</Text>
      </TouchableOpacity>
      <GameList>
        {games.map((game) => (
          <GameListItem
            status={game.status}
            id={game.id}
            key={game.id}
            onPress={() => {
              navigation.navigate(GameRouteNames.TABLE, { gameId: game.id });
            }}
          />
        ))}
      </GameList>
    </Container>
  );
};

export default LobbyScreen;

// import { useNavigation } from "@react-navigation/native";
// import { useAuth } from "../../hooks/authContext";
// import { TouchableOpacity, Text } from "react-native";
// import { useEffect, useState } from "react";
// import { listGames, createGame } from "../../api";
// import GameListItem from "../../components/GameListItem";
// import styled from "styled-components/native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { GameRouteNames } from "../../router/route-names";

// const Container = styled(SafeAreaView)`
//   display: flex;
//   flex: 1;
//   padding: 0 8px;
// `;

// const GameList = styled.ScrollView``;

// const LobbyScreen = () => {
//   const auth = useAuth();
//   const [games, setGames] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation<any>();

//   // Define fetchGames here so it can be used in useEffect and handleAddGame
//   const fetchGames = async () => {
//     setLoading(true);
//     try {
//       const data = await listGames(auth.token);
//       console.log("Fetched games:", data); // Log fetched data
//       setGames(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching games:", error);
//       setGames([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchGames();
//   }, [auth.token]);

//   const handleAddGame = async () => {
//     await createGame(auth.token);
//     fetchGames(); // Refetch games after adding a new one
//   };

//   if (loading) {
//     return <Text>Loading games...</Text>;
//   }

//   return (
//     <Container>
//       <TouchableOpacity onPress={handleAddGame} style={{ marginBottom: 10 }}>
//         <Text>Create Game</Text>
//       </TouchableOpacity>
//       <GameList>
//         {games.map((game) => (
//           <GameListItem
//             status={game.status}
//             id={game.id}
//             key={game.id}
//             onPress={() => {
//               navigation.setParam("gameId", game.id);
//               navigation.navigate(GameRouteNames.TABLE, { gameId: game.id });
//             }}
//           />
//         ))}
//       </GameList>
//     </Container>
//   );
// };

// export default LobbyScreen;
