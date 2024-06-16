import React from 'react'
import { createPurchased, deleteAllCart } from '../serverAction/mongodbApi'
import { auth } from '@clerk/nextjs'
import ClientThankYou from './ClientThankYou';


const page = async ({ searchParams }: { searchParams: { sessionId: string } }) => {
    const { userId } = auth();

    if (searchParams?.sessionId) {
        await createPurchased(userId!)
        await deleteAllCart(userId!)
    }
    return (
        <ClientThankYou />
    )
}
export default page