'use server'
import React from 'react'
import { PrismaClient } from "@prisma/client";
import { getAppDetails } from '../server.ts/apiCalls';
import { TSingleGameData } from '@/types';
import ClientCart from '../cart/ClientCart';
import { auth } from '@clerk/nextjs';
import { currentUser } from '../server.ts/prismaDb';
import { WishlistClient } from './WishlistClient';


const prisma = new PrismaClient();

export default async function page() {
    const { userId } = auth();
    let cartData: TSingleGameData[] | any[] = []

    if (userId) {
        const currentUserData = await currentUser(userId)

        cartData = await Promise.all((currentUserData?.wishlistData ?? [])?.map(async (id) => {
            const response = await getAppDetails(id);
            return response[id]?.data
        }))
    }

    return (
        <WishlistClient buyData={cartData} />
    )
}
