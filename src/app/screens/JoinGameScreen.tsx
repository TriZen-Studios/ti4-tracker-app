import React from "react";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {SafeAreaView, StyleSheet, Text, View, Button} from "react-native";
import {SectionList} from "react-native";

const DATA = [
  {
    data: ["My local game", "other game", "Join me!!"]
  }
];

interface Item {
  title: string;
  navigation: any;
}

const Item = (props: Item) => {
  const {title, navigation} = props;

  return (
    <View style={{paddingTop: 16}}>
      <Button title={title} onPress={() => navigation.navigate("FactionSelectionScreen")}></Button>
    </View>
  );
};

export default function JoinGameScreen(props) {
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            paddingTop: 16,
            paddingLeft: 16
          }}>
          <Text style={{fontSize: 24, alignSelf: "center"}}>Local Games</Text>
        </View>

        <View style={styles.container}>
          <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => <Item title={item} {...props} />}
          />
        </View>
        <View style={{paddingBottom: 16, paddingLeft: 16, width: 200}}>
          <Button title="Refresh" onPress={() => {}}></Button>
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
