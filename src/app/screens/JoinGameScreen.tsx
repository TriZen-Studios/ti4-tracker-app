import React, { useContext } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import { SectionList } from "react-native";
import { MultiplayerContext, MultiplayerContextProvider } from "../common/context/MultiplayerContext";

const Item = ({ title, navigation }) => (
  <View style={{ paddingTop: 16 }}>
    <Button title={title} onPress={() => {navigation.navigate("FactionSelectionScreen")}}></Button>
  </View>
);

export default function JoinGameScreen(props) {
  const { state, sendRequest } = useContext(MultiplayerContext) as MultiplayerContextProvider;

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: 16,
            paddingLeft: 16
          }}>
          <Text style={{ fontSize: 24, alignSelf: "center" }}>Local Games</Text>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text>
              <Text style={{ fontSize: 20 }}>Server: </Text>
              <Text style={{ fontSize: 16 }}>{state.serverUrl}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <SectionList
            sections={state.sessions}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => <Item title={item} navigator={props.navigation} {...props} />}
          />
        </View>
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          <Button title="Create Session" onPress={() => {}}></Button>
        </View>
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          <Button title="Direct Connect" onPress={() => {}}></Button>
        </View>
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          <Button title="Refresh" onPress={() => sendRequest("GET_GAME_SESSIONS")}></Button>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: getStatusBarHeight(),
    backgroundColor: "lightgray"
  }
});
