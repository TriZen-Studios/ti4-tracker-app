import React, {useState} from "react";
import {Button, SafeAreaView, StatusBar, Text, View} from "react-native";
import * as factionJSON from "../../data/factions.json";

interface Faction {
  id: string;
  name: string;
  disposition: string;
  tendencies: string;
  blurb: string;
  starting_units: [string];
  starting_tech: [string];
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

const FactionInfo = (props) => {
  const [index, setIndex] = useState(0);
  var currentFaction: Faction;
  var factionId: string;
  factionId = Object.getOwnPropertyNames(factionJSON.factions)[index];

  console.log("top level: " + Object.getOwnPropertyNames(factionJSON.factions));
  console.log("factionID: " + factionId);
  currentFaction = factionJSON.factions[factionId];
  console.log(factionJSON.factions[factionId]);

  return (
    <View style={{paddingTop: 16, paddingLeft: 16}}>
      <Text style={{fontSize: 24, textAlign: "center", color: currentFaction.colors.primary}}>
        {currentFaction.name}
      </Text>
      <Text style={{fontSize: 15, textAlign: "center", color: currentFaction.colors.secondary}}>
        Disposition: <Text style={{color: "white"}}>{currentFaction.disposition}</Text>
      </Text>
      <Text style={{fontSize: 15, textAlign: "center", color: currentFaction.colors.secondary}}>
        Tendencies: <Text style={{color: "white"}}>{currentFaction.tendencies}</Text>
      </Text>
    </View>
  );
};

export default function FactionSelectionScreen(props) {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: "black"}}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1
          }}>
          <View
            style={{
              paddingTop: 16,
              paddingLeft: 16
            }}>
            <Text style={{fontSize: 20, alignSelf: "center", color: "white"}}>Factions</Text>
          </View>
          <FactionInfo />
          <View style={{margin: 15}}>
            <Button title="Choose This Faction" onPress={(ev) => {}} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
