import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    startedPosition: null,
    currentPosition: null,
    finishedPosition: null
};

export const ploggingSlice = createSlice({
    name: 'plogging',
    initialState,
    reducers: {
        setStartedPosition: (state, action) => {
            state.startedPosition = action.payload;
        },
        setCurrentPosition: (state, action) => {
            state.currentPosition = action.payload;
        },
        setFinishedPosition: (state, action) => {
            state.finishedPosition = action.payload;
        },
    },
});

export const {setStartedPosition, 
              setCurrentPosition, 
              setFinishedPosition
            } = ploggingSlice.actions; 
              

export const selectStartedPosition = (state) => state.plogging.startedPosition;
export const selectCurrentPosition = (state) => state.plogging.currentPosition;
export const selectFinishedPosition = (state) => state.plogging.finishedPosition;

export default ploggingSlice.reducer;