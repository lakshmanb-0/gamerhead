'use server'
import { auth } from '@clerk/nextjs';
import React from 'react'
import { Profile } from '@/components/index';
import { StoreData } from '@/components/redux/reducers/auth.reducers';
import userDb from '@/models/userDb';

export default async function page() {

    const { userId } = auth();
    let purchased: StoreData[] = [];
    let wishlist: StoreData[] = [];

    // get wishlist ,lasVisited and purchased data if user is loggedIn
    if (userId) {
        const currentUserData = await userDb.findOne({ id: userId });
        purchased = currentUserData?.[0]?.purchasedData;
        wishlist = currentUserData?.[0]?.wishlistData;
    }
    return (
        <Profile purchased={purchased} wishlist={wishlist} />
    )
}
