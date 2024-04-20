import React, { createContext, useContext, useEffect, useState } from "react";
import { login, register } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface IAuthContext {
  token: string;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  token: "",
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  isLoading: false,
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    AsyncStorage.getItem("token")
      .then((value) => {
        if (value !== null) {
          setToken(value);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login(email, password);
      console.log("login: ", result);
      setToken(result);
      setEmail(email);
      await AsyncStorage.setItem("token", result);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleRegister = async (email: string, password: string) => {
  //   try {
  //     const result = await register(email, password);
  //     console.log("register: ", result);
  //     if (result.status === "success") {
  //       await AsyncStorage.setItem("email", email);
  //       setEmail(email);
  //       Alert.alert("Success", "Registration Successful!");
  //     } else {
  //       throw new Error(
  //         result.message || "Registration failed due to unknown error"
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Registration error: ", error);
  //     const errorMessage =
  //       error.message || "An unexpected error occurred during registration.";
  //     Alert.alert("Registration Error", errorMessage);
  //   }
  // };

  const handleRegister = async (email: string, password: string) => {
    try {
      const result = await register(email, password);
      await AsyncStorage.setItem("email", email);
      setEmail(email);
      await AsyncStorage.setItem("token", result);
      Alert.alert("Success", "Registration Successful!");
    } catch (error) {
      console.log(error);
      Alert.alert("Registration Error", "Failed To Registrer!");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setToken(null);
      //await AsyncStorage.removeItem("userIcon");
      console.log("Logout successful");
    } catch (error) {
      console.log("error logging out", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
