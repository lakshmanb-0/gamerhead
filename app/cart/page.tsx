'use server'
import React from 'react'
import { PrismaClient } from "@prisma/client";
import { getAppDetails } from '../server.ts/apiCalls';
import { TSingleGameData } from '@/types';
import ClientCart from './ClientCart';
import { auth } from '@clerk/nextjs';


const prisma = new PrismaClient();

export default async function page() {
    const { userId } = auth();
    let cartData: TSingleGameData[] | any[] = []
    let total: number[] = []

    if (userId) {
        const currentUserData = await prisma.usersDb.findFirst({
            where: {
                id: userId,
            },
        })

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
