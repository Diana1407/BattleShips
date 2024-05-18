import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/Login.screen";
import RegisterScreen from "../screens/auth/Register.screen";
import { AuthRouteNames } from "./route-names";
import { Text, StyleSheet } from "react-native";

const AuthStack = createNativeStackNavigator();

const authRoutes = (
  <AuthStack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerStyle: { backgroundColor: "#B3D8FA" },
    }}
  >
    <AuthStack.Screen
      name={AuthRouteNames.LOGIN}
      component={LoginScreen}
      options={{
        headerTitle: (props) => <Text {...props}>Login</Text>,
      }}
    />
    <AuthStack.Screen
      name={AuthRouteNames.REGISTER}
      component={RegisterScreen}
      options={{
        headerTitle: (props) => <Text {...props}>Register</Text>,
      }}
    />
  </AuthStack.Navigator>
);

export default authRoutes;
