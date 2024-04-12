import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Login from "./src/components/Login";
import Register from "./src/components/Register";
import { login } from "./src/api";
import { register } from "./src/api";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Login onSubmit={login} />
      {/* <Register /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
