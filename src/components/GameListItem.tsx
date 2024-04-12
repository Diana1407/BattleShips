import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.TouchableOpacity<{ color: string }>`
  padding: 8px;
  border: 1px solid ${(props) => props.color};
  border-radius: 4px;
  margin-bottom: 4px;
`;

export interface IGameListItem {
  id: number;
  onPress?: () => void;
  status: string;
}

const GameListItem: React.FC<IGameListItem> = ({ id, status, onPress }) => {
  return (
    <Container color="green" onPress={onPress}>
      <Text>
        {id} | {status}
      </Text>
    </Container>
  );
};

export default GameListItem;
