'use server'
import { TSingleGameData } from '@/types';
import { auth } from '@clerk/nextjs';
import React from 'react'
import { getAppDetails } from '../server.ts/apiCalls';
import { ProfileClient } from './ProfileClient';
import { currentUser } from '../server.ts/prismaDb';

export default async function page() {

    const { userId } = auth();
    let purchased: TSingleGameData[] | any[] = []
    let visited: TSingleGameData[] | any[] = []
    let wishlist: TSingleGameData[] | any[] = []

    // get wishlist ,lasVisited and purchased data if user is loggedIn
    if (userId) {
        const currentUserData = await currentUser(userId)

        visited = await Promise.all((currentUserData?.lastVisitedData ?? [])?.map(async (id) => {
            const response = await getAppDetails(id);
            return response[id]?.data
        }))
        purchased = await Promise.all((currentUserData?.purchasedData ?? [])?.map(async (id) => {
            const response = await getAppDetails(id);
            return response[id]?.data
        }))
        wishlist = await Promise.all((currentUserData?.wishlistData ?? [])?.map(async (id) => {
            const response = await getAppDetails(id);
            return response[id]?.data
        }))
    }
    return (
        <ProfileClient purchased={purchased} visited={visited} wishlist={wishlist} />
    )
}
