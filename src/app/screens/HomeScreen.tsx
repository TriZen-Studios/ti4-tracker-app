import React from "react";
import { Button, SafeAreaView, StatusBar, Text, View } from "react-native";

export default function HomeScreen(props) {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Text>Twilight Imperium: Edition 4 Helper</Text>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1
          }}>
          <View style={{ margin: 15 }}>
            <Button title="Singleplayer" onPress={() => {}} />
          </View>
          <View style={{ margin: 15 }}>
            <Button title="Multiplayer" onPress={(ev) => props.navigation.navigate("MultiplayerHomeScreen")} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
