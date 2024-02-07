import React from 'react'
import { createPurchased, currentUser, deleteAllCart } from '../server.ts/prismaDb'
import { auth } from '@clerk/nextjs'
import Link from 'next/link';

const page = async ({ searchParams }: { searchParams: { sessionId: string } }) => {
    const { userId } = auth();

    if (searchParams?.sessionId) {
        let x = await currentUser(userId!)
        await createPurchased(userId!, x?.cartData!)
        await deleteAllCart(userId!)
    }

    return (
        <Link href='/'>Thank you</Link>
    )
}
export default page