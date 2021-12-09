import { createSlice } from "@reduxjs/toolkit";
import * as MediaLibrary from "expo-media-library";

export const imageSlice = createSlice({
  name: "image",
  initialState: [],
  reducers: {
    addNew: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (_, payload) => ({
        payload: payload,
      }),
    },
    changeSelection: {
      reducer: (state, action) => {
        item = state[action.payload.index];
        item.selected = !item.selected;
        // item.paused = item.type === "video" ? item.selected : false;
      },
      prepare: (_, payload) => ({
        payload: payload,
      }),
    },
    save: {
      reducer: (state, action) => {
        state = action.payload;
      },
      prepare: (_, payload) => ({
        payload: payload,
      }),
    },
  },
});
export const { addNew, changeSelection, save } = imageSlice.actions;
export default imageSlice;
