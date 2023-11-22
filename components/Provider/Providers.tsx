'use client'
import React, { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { RootState, store } from "@/components/redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut } from '../redux/reducers/auth.reducers';

export default function Providers() {
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn)
    const dispatch = useDispatch()

    const login = () => {
        dispatch(logIn())
    }
    const handleClick = () => {
        dispatch(logOut())
    }

    return (
        <div>
            <button onClick={login}>login
                {loggedIn ? 'true' : 'false'}</button>
            <button onClick={handleClick}>logout
                {loggedIn ? 'true' : 'false'}</button>
        </div>
    )
}
