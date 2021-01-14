import React, { useContext, useEffect, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { SafeAreaView, StyleSheet, Text, View, Button, TextInput } from "react-native";
import { SectionList } from "react-native";
import { MultiplayerContext, MultiplayerContextProvider } from "../../../common/context/MultiplayerContext";
import { AppContext, AppContextProvider } from "../../../common/context/AppContext";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { SessionContext, SessionContextProviderValue } from "../../../common/context/SessionContext";

function Item({ session, player }) {
  const navigation = useNavigation();
  const { sendRequest } = useContext(MultiplayerContext) as MultiplayerContextProvider;
  const { updateProp } = useContext(SessionContext) as SessionContextProviderValue;
  const sessionId = session.id;

  return (
    <View style={{ paddingTop: 16 }}>
      <Button
        title={sessionId}
        onPress={() => {
          sendRequest("ADD_PLAYER_TO_GAME_SESSION", {
            sessionId: sessionId,
            playerId: player.id,
            name: player.name
          });
          updateProp("player.sessionId", sessionId);
          navigation.navigate("SessionScreen", { sessionId, playerId: player.id, name: player.name });
        }}></Button>
    </View>
  );
}

export default function MultiplayerHomeScreen() {
  const { state: multiplayerState, sendRequest } = useContext(MultiplayerContext) as MultiplayerContextProvider;
  const { state: sessionState, updateProp } = useContext(SessionContext) as SessionContextProviderValue;
  const navigation = useNavigation();
  const [_sessions, _setSessions] = useState([]);

  useEffect(() => {
    if (sessionState["sessions"]) {
      const sessions = Object.entries(sessionState["sessions"]).map(([key, value]: [string, any]) => {
        return {
          id: key,
          data: value
        };
      });
      _setSessions(sessions);
    }
  }, [sessionState["sessions"]]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: 16,
          paddingHorizontal: 16
        }}>
        <Text style={{ fontSize: 24, alignSelf: "center" }}>Game Sessions</Text>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text>
            <Text style={{ fontSize: 20 }}>Server: </Text>
            <Text style={{ fontSize: 16 }}>{multiplayerState.serverUrl}</Text>
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 16
          }}>
          <Text style={{ fontSize: 20, justifyContent: "center" }}>Player Name: </Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1, flexGrow: 1 }}
            onChangeText={(text) => updateProp("player.name", text)}
            value={sessionState.player.name}
          />
        </View>
      </View>

      <View style={styles.container}>
        <FlatList
          data={_sessions}
          keyExtractor={(session: any) => session.id}
          renderItem={({ item }) => <Item session={item} player={sessionState.player} />}
        />
      </View>
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <Button
          title="Create Session"
          onPress={() => {
            sendRequest("CREATE_GAME_SESSION", { sessionId: sessionState.player.id, name: sessionState.player.name });
            sendRequest("ADD_PLAYER_TO_GAME_SESSION", {
              sessionId: sessionState.player.id,
              playerId: sessionState.player.id,
              name: sessionState.player.name
            });
            updateProp("player.sessionId", sessionState.player.id);
            navigation.navigate("SessionScreen", {
              sessionId: sessionState.player.id,
              playerId: sessionState.player.id,
              name: sessionState.player.name
            });
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <Button title="Direct Connect" onPress={() => {}}></Button>
      </View>
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        <Button title="Refresh" onPress={() => sendRequest("GET_GAME_SESSIONS")}></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: getStatusBarHeight(),
    backgroundColor: "lightgray"
  }
});
