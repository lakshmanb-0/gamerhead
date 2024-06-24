import { createSlice } from "@reduxjs/toolkit"
import { InitialStore } from "../store/InitialStore"

export type StoreData = {
    header_image: string,
    name: string,
    is_free: boolean,
    price_overview: any,
    steam_appid: number
}
const authSlice = createSlice({
    name: 'authReducer',
    initialState: InitialStore.currentUser,
    reducers: {
        addUser: (state, action) => {
            // state = action.payload
            console.log(action.payload)
            state.id = action.payload.id
            state._id = JSON.stringify(action.payload._id)
            state.name = action.payload.name
            state.email = action.payload.email
            state.cartData = action.payload.cartData
            state.wishlistData = action.payload.wishlistData
            state.purchasedData = action.payload.purchasedData
            state.lastVisitedData = action.payload.lastVisitedData
        },
        addCart: (state, action) => {
            state.cartData.unshift(action.payload)
        },
        removeFromCart: (state, action) => {
            state.cartData = state.cartData.filter(el => el.steam_appid != action.payload)
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
            state.wishlistData.unshift(action.payload)

        },
        removeWishlist: (state, action) => {
            state.wishlistData = state.wishlistData.filter(el => el.steam_appid != action.payload)
        }
        ,
    }
})

export const { addCart, addLastVisited, addPurchased, addWishlist, removeWishlist, clearCart, removeFromCart, addUser } = authSlice.actions

export default authSlice.reducer