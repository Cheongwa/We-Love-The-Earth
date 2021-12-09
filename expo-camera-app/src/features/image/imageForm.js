import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Linking from "expo-linking";
import { changeSelection, save } from "../image/imageSlice";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  TouchableHighlight,
  Button,
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

const imageForm = () => {
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
          setIsCameramode(1);
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
                    console.log(item.selected);
                    dispatch(
                      changeSelection({
                        item: item,
                        selected: !item.selected,
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
              let encodedURL = encodeURIComponent(state[0].photo.uri);
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
export default imageForm;
