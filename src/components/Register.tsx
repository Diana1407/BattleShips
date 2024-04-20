import React, { useState } from "react";
import styled from "styled-components/native";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "80%", // Adjust width as needed
    maxWidth: 400, // Max width to ensure it's not too wide on larger screens
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // Position the container
    top: "30%", // Adjust top position as needed
    left: "10%", // Adjust left position as needed
    zIndex: 1, // Ensure the container is above the background image
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const Button = styled.TouchableOpacity``;

export interface ILogin {
  onSubmit: (email: string, password: string) => void;
}

const Register: React.FC<ILogin> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => onSubmit(email, password);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={setPassword}
        placeholder="Password"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
