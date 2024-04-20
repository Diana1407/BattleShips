import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.TouchableOpacity<{ color: string }>`
  padding: 16px;
  background-color: ${(props) => props.color};
  border-radius: 8px;
  margin-bottom: 12px;
`;

const ListItemText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export interface IGameListItem {
  id: number;
  player1: string | null;
  player2: string | null;
  onPress?: () => void;
  status: string;
}

const GameListItem: React.FC<IGameListItem> = ({ id, player1, player2, status, onPress }) => {


  const getStatusLabel = (status: string) => {
    switch (status) {
      case "MAP_CONFIG":
        return "Ships are being placed";
      case "CREATED":
        return "Game was Created";
      case "ACTIVE":
        return "Game in Progress";
      case "FINISHED":
        return "Game Finished";
      default:
        return "Unknown Status";
    }
  };

  const formattedStatus = getStatusLabel(status);

  return (
    <Container color="green" onPress={onPress}>
      <ListItemText>
        {player1} vs {player2} | {formattedStatus}
      </ListItemText>
    </Container>
  );
};

export default GameListItem;
