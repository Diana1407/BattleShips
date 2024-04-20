import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { ContextProvider, useGameContext } from "../../hooks/gameContext";
import { SafeAreaView, Text } from "react-native";

const TableScreen = () => {
  const route = useRoute<any>();
  const gameId = route.params.gameId;
  const gameCtx = useGameContext();

  useEffect(() => {
    const fetchData = async () => {
      //console.log("Loading game:", gameId);
      await gameCtx.loadGame(gameId);
      //console.log("Game loaded:", gameCtx.game);
    };

    fetchData();
  }, [])

  return (
    <SafeAreaView>
      <Text>Game Details:</Text>
      {gameCtx.game ? (
        <>
          {gameCtx.game.player1 && (<Text>Player 1: {gameCtx.game.player1.email}</Text>)}
          {gameCtx.game.player2 ? (<Text>Player 2: {gameCtx.game.player2.email}</Text>) : <Text>Waiting for player 2...</Text>}
         
          <Text>Status: {gameCtx.game.status}</Text>
         
        </>
      ) : (
        <Text>Loading game details...</Text>
      )}
    </SafeAreaView>
  );
};

export default () => (
  <ContextProvider>
    <TableScreen />
  </ContextProvider>
 );
