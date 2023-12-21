import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth.reducers";
import cartReducer from "../reducers/cart.reducer";
import purchasedReducer from "../reducers/purchased.reducer";
import wishlistReducer from "../reducers/wishlist.reducer";
import lastVisitedReducer from "../reducers/lastVisited.reducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cartData: cartReducer,
        wishlistData: wishlistReducer,
        purchasedData: purchasedReducer,
        lastVisitedData: lastVisitedReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
