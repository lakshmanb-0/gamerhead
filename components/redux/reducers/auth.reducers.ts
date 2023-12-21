import { createSlice } from "@reduxjs/toolkit"
import { InitialStore } from "../store/InitialStore"


const authSlice = createSlice({
    name: 'authReducer',
    initialState: InitialStore.loggedIn,
    reducers: {
        logIn: (state) => true,
        logOut: (state) => false
    }
})

export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer