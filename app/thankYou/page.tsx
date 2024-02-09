import React from 'react'
import { createPurchased, currentUser, deleteAllCart } from '../server.ts/prismaDb'
import { auth } from '@clerk/nextjs'
import ClientThankYou from './ClientThankYou';


const page = async ({ searchParams }: { searchParams: { sessionId: string } }) => {
    const { userId } = auth();

    if (searchParams?.sessionId) {
        let x = await currentUser(userId!)
        await createPurchased(userId!, x?.cartData!)
        await deleteAllCart(userId!)
    }
    return (
        <ClientThankYou />
    )
}
export default page