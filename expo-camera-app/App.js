import React, { useState, useEffect, useReducer } from "react";
import { useRef } from "react";
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
import { Camera } from "expo-camera";
import { Video, playbackObject } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import * as Linking from "expo-linking";

imageReducer = (state, action) => {
  switch (action.type) {
    case "addNewImage":
      return [...state, action.payload];
    case "changeSelection":
      action.payload.item.selected = action.payload.selected;
      action.payload.item.paused =
        action.payload.item.type === "video" ? action.payload.selected : false;
      console.log(action.payload.item);
      return [...state];
    case "saveSelected":
      saveImages(state.filter((item) => item.selected && !item.saved));
      return [...state];
  }
};
saveImages = async (itemList) => {
  console.log(itemList);
  for (item of itemList) {
    console.log(item);
    if (item.saved) continue;
    const result = await MediaLibrary.createAssetAsync(item.photo.uri);
    console.log(result);
    item.photo.uri = result.uri;
    item.saved = true;
  }
};
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameramode, setIsCameramode] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecordmode, setIsRecordmode] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [state, dispatch] = useReducer(imageReducer, []);
  const cameraRef = useRef(null);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");
      console.log(cameraStatus.status);
      const microphoneStatus = await Camera.requestMicrophonePermissionsAsync();
      console.log(microphoneStatus);
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView>
        <Text>No access to camera</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      {isCameramode ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          onCameraReady={() => setIsCameraReady(true)}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button_left}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
                console.log(type);
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                try {
                  if (cameraRef && cameraRef.current && isCameraReady) {
                    let photo = await cameraRef.current.takePictureAsync();
                    dispatch({
                      type: "addNewImage",
                      payload: {
                        selected: true,
                        type: "photo",
                        paused: true,
                        photo: photo,
                      },
                    });
                    console.log(photo);
                    console.log(state.length);
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
              style={styles.button_middle}
            />
            <TouchableOpacity
              onPress={async () => {
                try {
                  if (cameraRef && cameraRef.current && isCameraReady) {
                    if (!isRecordmode) {
                      setIsRecordmode(true);
                      let item = await cameraRef.current.recordAsync();
                      dispatch({
                        type: "addNewImage",
                        payload: {
                          selected: true,
                          type: "video",
                          paused: true,
                          photo: item,
                        },
                      });
                      console.log(item);
                      console.log(state.length);
                    } else {
                      setIsRecordmode(false);
                      cameraRef.current.stopRecording();
                      console.log("record stop");
                    }
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
              style={
                isRecordmode
                  ? styles.button_middle_record
                  : styles.button_middle
              }
            />
            <TouchableOpacity
              style={styles.button_right}
              onPress={() => {
                setIsCameramode(false);
              }}
            >
              <Text style={styles.text}> Exit </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
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
              setIsCameramode(true);
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
                keyExtractor={(photo) => photo.photo.uri}
                renderItem={({ item }) => {
                  return (
                    <TouchableHighlight
                      onPress={() => {
                        console.log(item.selected);
                        dispatch({
                          type: "changeSelection",
                          payload: {
                            item: item,
                            selected: !item.selected,
                          },
                        });
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
                          source={{ uri: item.photo.uri }}
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
                          source={{ uri: item.photo.uri }}
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
                    await dispatch({ type: "saveSelected" });
                  }
                }}
              ></Button>
              <Button
                title="Export to Instagram"
                onPress={async () => {
                  await saveImages(state);
                  let encodedURL = encodeURIComponent(state[0].photo.uri);
                  console.log(encodedURL);
                  let instagramURL = `instagram://library?AssetPath=${encodedURL}`;
                  Linking.openURL(instagramURL);
                }}
              />
            </>
          ) : null}
        </SafeAreaView>
      )}
    </View>
  );
}

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
