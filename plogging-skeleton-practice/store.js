import { configureStore } from "@reduxjs/toolkit";
import ploggingReducer from "./src/slices/ploggingSlice";

export const store = configureStore({
    reducer: {
        plogging: ploggingReducer,
    },
});