import React, { createContext, useContext, useEffect, useState } from "react";
import { loadGame } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./authContext";


interface IGameContext {
  game: Game | null;
  loadGame: (id: string) => Promise<void>;
}

interface Game {
  id: string;
  player1: {
    email: string;
    id: string;
  };
  player2: {
    email: string;
    id: string;
  };
  status: "MAP_CONFIG" | "CREATED" | "ACTIVE" | "FINISHED";
}

const Context = createContext<IGameContext>({
  loadGame: () => Promise.resolve(),
  game: null
 
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [game, setGame] = useState<Game | null>(null);
  const auth = useAuth();

  const loadGameDetails = async (id: string) => {
    try {
      const loadedGame = await loadGame(auth.token, id);
      setGame(loadedGame);
    } catch (error) {
      console.error("Error loading game:", error);
    }
  };

  useEffect(() => {
    console.log("Game context loaded");
  }, [game]); 


  return (
    <Context.Provider value={{loadGame: loadGameDetails, game}}>
        {children}
        </Context.Provider>
    );
};

export const useGameContext = () => useContext(Context);
