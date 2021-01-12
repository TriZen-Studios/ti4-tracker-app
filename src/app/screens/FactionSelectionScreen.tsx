import React, {useRef, useState} from "react";
import {SafeAreaView, StatusBar, Text, View} from "react-native";
import {Button} from "react-native-elements";
import {FlatList, TouchableOpacity} from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/FontAwesome";
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

function FactionInfo (props) {
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
        Short Description: <Text style={{color: "white"}}>{faction.blurb}</Text>
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
};

function Item ({currFaction, selectedLocation, swipeObj}) {
  return (
    <View style={{paddingTop: 13, alignItems: "center"}}>
      <TouchableOpacity
        onPress={() => {
          let swipe: Swiper = swipeObj.current;
          let currentIndex = swipe.props.index;
          console.log(currentIndex + "  current swiper index");
          console.log(selectedLocation + " user selected faction index");
          let diff = Math.abs(currentIndex - selectedLocation);
          if (currentIndex < selectedLocation) {
            swipe.scrollBy(diff);
          } else if (currentIndex > selectedLocation) {
            // have to go around the length of the list
            swipe.scrollBy(factionJSON.data.length - diff);
          }
        }}>
        <Text style={{fontSize: 20, textAlign: "center", color: "white"}}>{currFaction.name}</Text>
      </TouchableOpacity>
    </View>
  )
};

// function useForceUpdate(){
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue(value => value + 1); // update the state to force render
// }

const useForceUpdate = () => useState()[0];

export default function FactionSelectionScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const swiper = useRef<Swiper>(null);
  const [curIndex, setCurIndex] = useState(0);
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
            <View style={{width: 30}}>
              <Button
                icon={<Icon name="angle-down" size={15} color="white" />}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
          </View>
          {modalVisible ? (
            <View
              style={{
                backgroundColor: "#3888e2",
                height: factionJSON.data.length * 45,
                width: "60%",
                position: "absolute",
                top: 80,
                marginLeft: 20,
                zIndex: 100,
                borderRadius: 5
              }}>
              <FlatList
                data={factionJSON.data}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => <Item currFaction={item} selectedLocation={index} swipeObj={swiper} />}
              />
            </View>
          ) : null}
          {/* This swiper holds all the views and lets you move between factions */}
          <Swiper
            ref={swiper}
            loop={true}
            index={0}
            showsPagination={false}
            showsButtons={true}
            onIndexChanged={ () => {
              setCurIndex(swiper.current.props.index);
            }}>
            <FactionInfo faction={factionJSON.data[0]} />
            <FactionInfo faction={factionJSON.data[1]} />
          </Swiper>
          <View style={{margin: 15}}>
            <Button title="Choose This Faction" onPress={() => {}} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
