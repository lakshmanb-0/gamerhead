import { createSlice } from "@reduxjs/toolkit";
import { InitialStore } from "../store/InitialStore";

const lastVisitedSlice = createSlice({
    name: 'lastVisitedReducer',
    initialState: InitialStore.lastVisitedData,
    reducers: {
        addLastVisited: (state, action) => [...state, ...action.payload]
    }
})

export const { addLastVisited } = lastVisitedSlice.actions
export default lastVisitedSlice.reducer 
