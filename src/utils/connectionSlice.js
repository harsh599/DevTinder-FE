import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: 'connection',
    initialState: null,
    reducers:{
        addConnection: (state, action) => {
            // state.in action.payload;
            return action.payload;
        },
         removeConnection: (state, action) => {
            return null;
        }
    }
});
export const {addConnection , removeConnection} = connectionSlice.actions;
export default connectionSlice.reducer;