'use client'
import { UserButton, UserProfile, useAuth, useUser } from '@clerk/nextjs';
import React from 'react'

function Navbar() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const { isSignedIn, user } = useUser();
    return (
        <div className='w-[20px] h-[20px]'>
            <div className='[&>div>div>div:nth-child(3)]:hidden'>
                <UserProfile />
            </div>
            <UserButton afterSignOutUrl='/' />
        </div>
    )
}

export default Navbar