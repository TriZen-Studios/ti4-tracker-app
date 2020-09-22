import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MultiplayerHomeScreen from "./screens/MultiplayerHomeScreen";
import { Text } from "react-native";
import MultiplayerContextProvider from "../../common/context/MultiplayerContext";

const MultiplayerStack = createStackNavigator();

export default function MultiplayerView(props) {
  return (
    <MultiplayerContextProvider>
      <MultiplayerStack.Navigator>
        <MultiplayerStack.Screen name="Multiplayer" component={MultiplayerHomeScreen} />
      </MultiplayerStack.Navigator>
    </MultiplayerContextProvider>
  );
}
