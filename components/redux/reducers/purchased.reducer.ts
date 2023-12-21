import { createSlice } from "@reduxjs/toolkit"
import { InitialStore } from "../store/InitialStore"

const purchaseSlice = createSlice({
    name: 'purchasedReducer',
    initialState: InitialStore.purchasedData,
    reducers: {
        addPurchased: (state, action) => [...state, ...action.payload]
    }

})

export const { addPurchased } = purchaseSlice.actions
export default purchaseSlice.reducer