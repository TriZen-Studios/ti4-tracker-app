import React from "react";
import {Button, SafeAreaView, StatusBar, Text, View} from "react-native";

export default function HomeScreen(props) {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <Text>Twilight Imperium: Edition 4 Helper</Text>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1
          }}>
          <View style={{margin: 15}}>
            <Button title="Join Game" onPress={() => props.navigation.navigate("JoinGameScreen")} />
          </View>
          <View style={{margin: 15}}>
            <Button title="Create Game" onPress={(ev) => {}} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
