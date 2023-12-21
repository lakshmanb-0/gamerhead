import { createSlice } from "@reduxjs/toolkit"
import { InitialStore } from "../store/InitialStore"

const cartSlice = createSlice({
    name: 'cartReducer',
    initialState: InitialStore.cartData,
    reducers: {
        addCart: (state, action) => action.payload
    }
})

export const { addCart } = cartSlice.actions
export default cartSlice.reducer