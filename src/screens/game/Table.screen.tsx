import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TableScreen = () => {
  const navigation = useNavigation();
  console.log(navigation);
  return (
    <SafeAreaView>
      <Text>Game</Text>
    </SafeAreaView>
  );
};

export default TableScreen;
