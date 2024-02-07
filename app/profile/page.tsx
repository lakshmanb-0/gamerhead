'use server'
import { TSingleGameData } from '@/types';
import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';
import React from 'react'
import { getAppDetails } from '../server.ts/apiCalls';
import { ProfileClient } from './ProfileClient';

export default async function page() {
    const prisma = new PrismaClient();

    const { userId } = auth();
    let purchased: TSingleGameData[] | any[] = []
    let visited: TSingleGameData[] | any[] = []
    let wishlist: TSingleGameData[] | any[] = []

    if (userId) {
        const currentUserData = await prisma.usersDb.findFirst({
            where: {
                id: userId,
            },
        })

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
