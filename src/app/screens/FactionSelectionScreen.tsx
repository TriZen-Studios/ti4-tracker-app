import React, {useState} from "react";
import {StatusBar, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {FlatList, TouchableOpacity, TouchableWithoutFeedback} from "react-native-gesture-handler";
import GestureRecognizer from "react-native-swipe-gestures";
import Icon from "react-native-vector-icons/FontAwesome";
import * as factionJSON from "../../data/factions.json";

interface Faction {
  id: string;
  name: string;
  disposition: string;
  tendencies: string;
  brief_description: string;
  starting_units: [string];
  starting_tech: [string];
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

function FactionInfo(props) {
  const faction: Faction = props.faction;
  const unitList = faction.starting_units.map((unit) => (
    <Text key={unit} style={{color: "white", paddingLeft: 65, paddingBottom: 5}}>
      {unit}
    </Text>
  ));

  return (
    <View style={{paddingTop: 16, paddingLeft: 16, flexDirection: "column"}}>
      <Text style={{fontSize: 24, textAlign: "center", color: faction.colors.primary, width: "100%", height: 50}}>
        {faction.name}
      </Text>
      <Text
        style={{
          fontSize: 15,
          textAlign: "center",
          color: faction.colors.secondary,
          width: "100%",
          height: 50
        }}>
        Disposition: <Text style={{color: "white"}}>{faction.disposition}</Text>
      </Text>
      <Text style={{fontSize: 15, textAlign: "center", color: faction.colors.secondary, width: "100%", height: 50}}>
        Tendencies: <Text style={{color: "white"}}>{faction.tendencies}</Text>
      </Text>
      <Text style={{fontSize: 15, textAlign: "center", color: faction.colors.secondary, width: "100%", height: 100}}>
        Short Description: <Text style={{color: "white"}}>{faction.brief_description}</Text>
      </Text>
      <Text style={{fontSize: 15, textAlign: "center", color: faction.colors.secondary, width: "100%", height: 30}}>
        Starting Units:
      </Text>
      <View
        style={{
          flexDirection: "column",
          flexWrap: "wrap",
          height: 100
        }}>
        {unitList}
      </View>
      <Text
        style={{
          fontSize: 15,
          textAlign: "center",
          color: faction.colors.secondary,
          width: "100%",
          height: 30
        }}>
        Starting Tech:
      </Text>
      <View
        style={{
          flexDirection: "column",
          flexWrap: "wrap",
          height: 50
        }}>
        {faction.starting_tech.map((unit) => (
          <Text key={unit} style={{color: "white", paddingLeft: 45, paddingBottom: 10}}>
            {unit}
          </Text>
        ))}
      </View>
    </View>
  );
}

function DropDownItem({setFaction, currFactionName, setCurIndex, selectedLocation}) {
  return (
    <View style={{paddingTop: 13, alignItems: "center"}}>
      <TouchableOpacity
        onPress={() => {
          setCurIndex(selectedLocation);
          setFaction(factionJSON.data[selectedLocation]);
        }}>
        <Text style={{fontSize: 20, textAlign: "center", color: "white"}}>{currFactionName}</Text>
      </TouchableOpacity>
    </View>
  );
}

function onSwipeLeft(curIndex) {
  console.log("You swiped left from " + curIndex);
  if (curIndex == factionJSON.data.length - 1) {
    return 0;
  } else {
    return curIndex + 1;
  }
}

function onSwipeRight(curIndex) {
  console.log("You swiped right from " + curIndex);
  if (curIndex == 0) {
    return factionJSON.data.length - 1;
  } else {
    return curIndex - 1;
  }
}

const config = {
  velocityThreshold: 0.2,
  directionalOffsetThreshold: 80,
  gestureIsClickThreshold: 2
};

export default function FactionSelectionScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [curIndex, setCurIndex] = useState(0);
  const [faction, setFaction] = useState(factionJSON.data[0]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <GestureRecognizer
        onSwipeLeft={() => {
          const newIndex = onSwipeLeft(curIndex);
          setCurIndex(newIndex);
          setFaction(factionJSON.data[newIndex]);
          if (modalVisible) setModalVisible(false);
        }}
        onSwipeRight={() => {
          const newIndex = onSwipeRight(curIndex);
          setCurIndex(newIndex);
          setFaction(factionJSON.data[newIndex]);
          if (modalVisible) setModalVisible(false);
        }}
        config={config}
        style={{
          flex: 1,
          backgroundColor: "black"
        }}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1
          }}>
          <View
            style={{
              paddingLeft: 15,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}>
            <View style={{width: 30}}>
              <Button
                icon={<Icon name="angle-down" size={15} color="white" />}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
            {modalVisible ? (
              <View
                style={{
                  backgroundColor: "#3888e2",
                  height: factionJSON.data.length * 45,
                  width: "60%",
                  position: "absolute",
                  top: 35,
                  marginLeft: 15,
                  zIndex: 100,
                  borderRadius: 5
                }}>
                <FlatList
                  data={factionJSON.data}
                  keyExtractor={(item) => item.id}
                  renderItem={({item, index}) => (
                    <DropDownItem
                      setFaction={setFaction}
                      currFactionName={item.name}
                      setCurIndex={setCurIndex}
                      selectedLocation={index}
                    />
                  )}
                />
              </View>
            ) : null}
            <Text style={{fontSize: 20, alignSelf: "center", color: "white"}}>Factions</Text>
            <View style={{width: 30}} />
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              if (modalVisible) setModalVisible(false);
            }}>
            <FactionInfo faction={faction} />
          </TouchableWithoutFeedback>
          <View style={{margin: 15}}>
            <Button title="Choose This Faction" onPress={() => {}} />
          </View>
        </View>
      </GestureRecognizer>
    </>
  );
}
