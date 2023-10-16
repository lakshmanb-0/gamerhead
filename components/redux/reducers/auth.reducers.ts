import { createSlice } from "@reduxjs/toolkit"
import { cookies } from "next/dist/client/components/headers"
import { InitialStore } from "../store/InitialStore"

type authState = {
    loggedIn: boolean
}

const authSlice = createSlice({
    name: 'authReducer',
    initialState: InitialStore.auth,
    reducers: {
        logIn: (state: authState) => {
            state.loggedIn = true
        },
        logOut: (state: authState) => {
            // auth.logout()
            console.log('hello');
            state.loggedIn = false
            // cookies().delete('token')
        }
    }
})
export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer