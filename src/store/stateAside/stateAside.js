import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    statusBar: true,
    statusAccord: false,
}

export const stateAside = createSlice({
    name: "stateAside",
    initialState,
    reducers: {
        changeBar: (state, action) => {
            state.statusBar = action.payload;
        },
        accordion: (state, action) => {
            state.statusAccord = action.payload;
        }
    }
})

export const { changeBar, accordion } = stateAside.actions;
export default stateAside.reducer;