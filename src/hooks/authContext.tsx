import React, { createContext, useContext, useEffect, useState } from "react";
import { login, register } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IAuthContext {
  token: string;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout : () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  token: "",
  login: async () => {},
  register: async () => {},
  logout : async () => {},
  isLoading: false,
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string>("");
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
      await AsyncStorage.setItem("token", result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegister = async (email: string, password: string) => {
    try {
      const result = await register(email, password);
      console.log("register: ", result);
      setToken(result);
      await AsyncStorage.setItem("token", result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem("token");
    setToken(null);
    //await AsyncStorage.removeItem("userIcon");
    console.log("Logout successful");
  } 
  catch (error) {
    console.log("error logging out", error);
  }
}

  return (
    <AuthContext.Provider
      value={{
        token,
        login: handleLogin,
        register: handleRegister,
        logout : handleLogout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
