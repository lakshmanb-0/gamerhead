'use server'
import React from 'react'
import { auth } from '@clerk/nextjs';
import { Cart } from '@/components/index';
import userDb from '@/models/userDb';

export default async function page() {
    const { userId } = auth();
    let cartData: any[] = []

    // get user data if signIn 
    if (userId) {
        const currentUserData = await userDb.findOne({ id: userId });
        cartData = currentUserData?.[0]?.cartData || []
    }

    return (
        <Cart buyData={cartData} />
    )
}
