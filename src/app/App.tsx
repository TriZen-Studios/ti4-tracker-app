import "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import React from "react";
import {StyleSheet} from "react-native";
import JoinGameScreen from "./screens/JoinGameScreen";
import HomeScreen from "./screens/HomeScreen";
import MultiplayerContextProvider from "./common/context/MultiplayerContext";
import AppContextProvider from "./common/context/AppContext";
import FactionSelectionScreen from "./screens/FactionSelectionScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home">{(props) => <HomeScreen {...props} />}</Stack.Screen>
          <Stack.Screen name="JoinGameScreen">
            {(props) => (
              <MultiplayerContextProvider>
                <JoinGameScreen {...props} />
              </MultiplayerContextProvider>
            )}
          </Stack.Screen>
        <Stack.Screen name="FactionSelectionScreen">{(props) => <FactionSelectionScreen {...props} />}</Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
