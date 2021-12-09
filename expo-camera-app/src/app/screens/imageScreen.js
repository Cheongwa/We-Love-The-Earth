import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as MediaLibrary from "expo-media-library";
import * as Linking from "expo-linking";
import { changeSelection, save } from "../../features/image/imageSlice";
import { Video } from "expo-av";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  TouchableHighlight,
  Button,
  StyleSheet,
} from "react-native";

saveImages = async (itemList) => {
  console.log(itemList);
  for (item of itemList) {
    console.log(item);
    if (item.saved) continue;
    const result = await MediaLibrary.createAssetAsync(item.uri);
    console.log(result);
    item.uri = result.uri;
    item.saved = true;
  }
  return itemList;
};

export default ({ navigation }) => {
  console.log(navigation);
  const dispatch = useDispatch();
  const state = useSelector((x) => x.image);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("camera");
        }}
        style={{
          width: 130,
          borderRadius: 4,
          backgroundColor: "#14274e",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 40,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Take picture
        </Text>
      </TouchableOpacity>
      {state.length > 0 ? (
        <>
          <FlatList
            contentContainerStyle={{
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
            width={Dimensions.get("screen").width}
            data={state}
            horizontal={false}
            numColumns={3}
            keyExtractor={(item) => item.uri}
            renderItem={({ item }) => {
              return (
                <TouchableHighlight
                  onPress={() => {
                    console.log(state.indexOf(item));
                    console.log(item);
                    dispatch(
                      changeSelection(state, {
                        index: state.indexOf(item),
                      })
                    );
                    console.log(item.selected);
                  }}
                  style={
                    item.selected
                      ? styles.selectedImage
                      : styles.unselectedImage
                  }
                >
                  {item.type === "video" ? (
                    <Video
                      style={{
                        height: Dimensions.get("screen").width * 0.3,
                        width: Dimensions.get("screen").width * 0.3,
                        margin: 3,
                      }}
                      source={{ uri: item.uri }}
                      shouldPlay={true}
                      isLooping={true}
                      isMuted={true}
                    ></Video>
                  ) : (
                    <Image
                      style={{
                        height: Dimensions.get("screen").width * 0.3,
                        width: Dimensions.get("screen").width * 0.3,
                        margin: 3,
                      }}
                      source={{ uri: item.uri }}
                    ></Image>
                  )}
                </TouchableHighlight>
              );
            }}
          />
          <Button
            title="Save Selected"
            style={{ marginBottom: 10 }}
            onPress={async () => {
              const perm = await MediaLibrary.requestPermissionsAsync();
              console.log(perm);
              if (perm.granted) {
                const savedImages = await saveImages(state);
                dispatch(save({ savedImages }));
              }
            }}
          ></Button>
          <Button
            title="Export to Instagram"
            onPress={async () => {
              const savedImages = await saveImages(state);
              dispatch(save({ savedImages }));
              let encodedURL = encodeURIComponent(state[0].uri);
              console.log(encodedURL);
              let instagramURL = `instagram://library?AssetPath=${encodedURL}`;
              Linking.openURL(instagramURL);
            }}
          />
        </>
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    marginBottom: 10,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  button_left: {
    backgroundColor: "transparent",
    paddingTop: 10,
    paddingLeft: 10,
  },
  button_middle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  button_middle_record: {
    height: 50,
    width: 50,
    borderRadius: 50,
    paddingBottom: 10,
    backgroundColor: "red",
  },
  button_right: {
    paddingTop: 10,
    paddingRight: 10,
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: "red",
  },
  unselectedImage: {
    borderWidth: 2,
    borderColor: "red",
    opacity: 0.4,
  },
});
