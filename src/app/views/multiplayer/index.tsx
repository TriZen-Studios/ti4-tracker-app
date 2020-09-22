import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import JoinGameScreen from "../../screens/JoinGameScreen";
import { Text } from "react-native";
import MultiplayerContextProvider from "../../common/context/MultiplayerContext";

const MultiplayerStack = createStackNavigator();

export default function MultiplayerView(props) {
  return (
    <MultiplayerStack.Navigator>
      <MultiplayerStack.Screen name="Multiplayer">
        {() => (
          <MultiplayerContextProvider>
            <>
              <JoinGameScreen />
            </>
          </MultiplayerContextProvider>
        )}
      </MultiplayerStack.Screen>
    </MultiplayerStack.Navigator>
  );
}
