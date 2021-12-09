import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "../features/image/imageSlice";
const store = configureStore({
  reducer: { image: imageSlice.reducer },
});
//console.log(store.getState());
export default store;
