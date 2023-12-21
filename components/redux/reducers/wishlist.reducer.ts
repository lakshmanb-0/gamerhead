import { createSlice } from "@reduxjs/toolkit";
import { InitialStore } from "../store/InitialStore";

const wishlistSlice = createSlice({
    name: 'wishlistReducer',
    initialState: InitialStore.wishlistData,
    reducers: {
        addWishlist: (state, action) => action.payload
    }
})

export const { addWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer 
