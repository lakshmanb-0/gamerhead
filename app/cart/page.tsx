'use server'
import React from 'react'
import { getAppDetails } from '../server.ts/apiCalls';
import { TSingleGameData } from '@/types';
import ClientCart from './ClientCart';
import { auth } from '@clerk/nextjs';
import { currentUser } from '../server.ts/prismaDb';

export default async function page() {
    const { userId } = auth();
    let cartData: TSingleGameData[] | any[] = []
    let total: number[] = []

    // get user data if signIn 
    if (userId) {
        const currentUserData = await currentUser(userId)

        cartData = await Promise.all((currentUserData?.cartData ?? [])?.map(async (id) => {
            const response = await getAppDetails(id);
            response[id]?.data?.price_overview && total.push(response[id]?.data?.price_overview?.final / 100)
            return response[id]?.data
        }))
    }

    return (
        <ClientCart buyData={cartData} total={total} />
    )
}
