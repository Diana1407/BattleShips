import { StyleSheet, Text, View } from "react-native";
import Router from "./src/router";
import "react-native-gesture-handler";
import { AuthContextProvider } from "./src/hooks/authContext";

export default function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#263973",
    alignItems: "center",
    justifyContent: "center",
  },
});
