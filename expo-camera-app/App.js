import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import cameraScreen from "./src/app/screens/cameraScreen";
import imageScreen from "./src/app/screens/imageScreen";
import store from "./src/app/store";
import { Provider } from "react-redux";

const bottomNavigator = createBottomTabNavigator({
  image: imageScreen,
  camera: cameraScreen,
});
const App = createAppContainer(bottomNavigator);
//console.log(store);
export default () => {
  return (
    <Provider store={store}>
      <App></App>
    </Provider>
  );
};
