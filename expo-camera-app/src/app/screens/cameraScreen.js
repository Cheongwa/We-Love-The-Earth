import React, { useState, useRef, useEffect } from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Camera } from "expo-camera";
import { addNew } from "../../features/image/imageSlice";
import { View, Alert } from "react-native";

export default ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(null);
  const [cameraMode, setCameraMode] = useState(0); //0:카메라 사용 X 1:카메라 사용중(영상 X) 2: 영상 촬영중
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const dispatch = useDispatch();
  const cameraRef = useRef(null);
  const isFocused = navigation.isFocused();
  const state = useSelector((x) => x.image);
  console.log(`Focused: ${isFocused}`);

  useEffect(async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    console.log(`Camera Status: ${cameraStatus.granted}`);
    setHasCameraPermission(cameraStatus.granted);
    const microphoneStatus = await Camera.requestMicrophonePermissionsAsync();
    console.log(`Microphone Status: ${microphoneStatus.granted}`);
    setHasMicrophonePermission(microphoneStatus.granted);
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    if (!hasCameraPermission) {
      Alert.alert("Alert", "카메라 사용 권한을 획득하지 못했습니다.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    if (!hasMicrophonePermission) {
      Alert.alert("Alert", "마이크 사용 권한을 획득하지 못했습니다.", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    return (
      <SafeAreaView>
        <Text>No access to camera</Text>
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
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
                  dispatch(
                    addNew(state, {
                      selected: true,
                      type: "photo",
                      uri: photo.uri,
                    })
                  );
                  console.log(state);
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
                  if (cameraMode != 2) {
                    setCameraMode(2);
                    let video = await cameraRef.current.recordAsync();
                    dispatch(
                      addNew(state, {
                        selected: true,
                        type: "video",
                        uri: video.uri,
                      })
                    );
                    console.log(video);
                  } else {
                    cameraRef.current.stopRecording();
                    console.log("record stop");
                    setCameraMode(1);
                  }
                }
              } catch (e) {
                console.log(e);
              }
            }}
            style={
              cameraMode === 2
                ? styles.button_middle_record
                : styles.button_middle
            }
          />
          <TouchableOpacity
            style={styles.button_right}
            onPress={() => {
              setCameraMode(0);
              navigation.navigate("image");
            }}
          >
            <Text style={styles.text}> Exit </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
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
