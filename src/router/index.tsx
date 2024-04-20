import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import authRoutes from "./auth.router";
import { useAuth } from "../hooks/authContext";
import gameRoutes from "./game.router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Router: React.FC = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      {auth.token ? gameRoutes : authRoutes}
    </NavigationContainer>
  );
};

export default Router;
