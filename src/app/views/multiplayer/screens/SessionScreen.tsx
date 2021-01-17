import React, { useContext, useEffect, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { SafeAreaView, Text, Button, View, FlatList, BackHandler } from "react-native";
import { MultiplayerContext, MultiplayerContextProvider } from "../../../common/context/MultiplayerContext";
import { useFocusEffect } from "@react-navigation/native";
import { SessionContext, SessionContextProviderValue } from "../../../common/context/SessionContext";
import { useNavigation } from "@react-navigation/native";

function Player({ player }) {
  return (
    <View style={{ paddingTop: 16 }}>
      <Text>{`${player.name}`}</Text>
    </View>
  );
}

export default function SessionScreen(props) {
  const { state: multiplayerState, sendRequest } = useContext(MultiplayerContext) as MultiplayerContextProvider;
  const { state: sessionState } = useContext(SessionContext) as SessionContextProviderValue;
  const { sessionId, playerId, name } = props.route.params;
  const [_players, _setPlayers] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        sendRequest("REMOVE_PLAYER_FROM_GAME_SESSION", {
          sessionId,
          playerId
        });
        return false;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(() => {
    const session = sessionState.sessions[sessionId];
    if(session) {
      const players = session.players;
      if(session.status == "open") {
        if (players) {
          // list view needs id prop for rendering optimization
          _setPlayers(Object.entries(session.players).map(([key, value]: [string, any]) => {
            return {
              id: key,
              ...value
            };
          }));
        }
      }      
      else if (session.status == "closed") {
        // no need to go back again if host left game
        if(sessionId !== playerId) {
          navigation.goBack();
        }
      }
    }
  }, [sessionState.sessions[sessionId]]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: 16,
          paddingHorizontal: 16
        }}>
        <Text style={{ fontSize: 24, alignSelf: "center" }}>Session</Text>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text>
            <Text style={{ fontSize: 20 }}>Server: </Text>
          </Text>
          <View
            style={{
              flex: 1,
              margin: getStatusBarHeight(),
              backgroundColor: "lightgray"
            }}>
            <FlatList
              data={_players}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Player player={item} />}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
