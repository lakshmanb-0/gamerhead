import { createSlice } from "@reduxjs/toolkit"
import { InitialStore } from "../store/InitialStore"


const authSlice = createSlice({
    name: 'authReducer',
    initialState: InitialStore.currentUser,
    reducers: {
        addCart: (state, action) => {
            Array.isArray(action.payload)
                ? state.cartData = action.payload
                : state.cartData = [action.payload, ...state.cartData]
        },
        clearCart: (state) => { state.cartData = [] },
        addLastVisited: (state, action) => {
            Array.isArray(action.payload)
                ? state.lastVisitedData = action.payload
                : state.lastVisitedData = [action.payload, ...state.lastVisitedData]
        },
        addPurchased: (state, action) => {
            Array.isArray(action.payload)
                ? state.purchasedData = action.payload
                : state.purchasedData = [action.payload, ...state.purchasedData]
        },
        addWishlist: (state, action) => {
            Array.isArray(action.payload)
                ? state.wishlistData = action.payload
                : state.wishlistData = [action.payload, ...state.wishlistData]
        },
        removeWishlist: (state, action) => {
            Array.isArray(action.payload)
                ? state.wishlistData = action.payload
                : state.wishlistData = state.wishlistData.filter(el => el != action.payload)
        },
    }
})

export const { addCart, addLastVisited, addPurchased, addWishlist, removeWishlist, clearCart } = authSlice.actions

export default authSlice.reducer