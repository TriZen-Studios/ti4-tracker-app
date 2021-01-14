import "react-native-gesture-handler";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import React, { useContext } from "react";
import MultiplayerHomeScreen from "./screens/MultiplayerHomeScreen";
import { Text } from "react-native";
import MultiplayerContextProvider, {
  MultiplayerContext,
  MultiplayerContextProvider as MultiplayerContextProviderValue
} from "../../common/context/MultiplayerContext";
import SessionScreen from "./screens/SessionScreen";
import { SessionContext, SessionContextProviderValue } from "../../common/context/SessionContext";

const MultiplayerStack = createStackNavigator();

function CustomHeaderBackButton(props) {
  const { sendRequest } = useContext(MultiplayerContext) as MultiplayerContextProviderValue;
  const { state: sessionState } = useContext(SessionContext) as SessionContextProviderValue;

  return (
    <HeaderBackButton
      {...props}
      onPress={() => {
        sendRequest("REMOVE_PLAYER_FROM_GAME_SESSION", {
          sessionId: sessionState.player.sessionId,
          playerId: sessionState.player.id
        });
        props.onPress();
      }}
    />
  );
}

export default function MultiplayerView(props) {
  return (
    <MultiplayerContextProvider>
      <MultiplayerStack.Navigator>
        <MultiplayerStack.Screen name="HomeScreen" component={MultiplayerHomeScreen} />
        <MultiplayerStack.Screen
          name="SessionScreen"
          options={{
            headerLeft: (props) => <CustomHeaderBackButton {...props} />
          }}
          component={SessionScreen}
        />
      </MultiplayerStack.Navigator>
    </MultiplayerContextProvider>
  );
}
