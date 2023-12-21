import React from 'react'
import { createPurchased, deleteAllCart } from '../server.ts/prismaDb'
import { auth } from '@clerk/nextjs'
import Link from 'next/link';

const page = async ({ searchParams }: { searchParams: { sessionId: string } }) => {
    const { userId } = auth();

    if (searchParams?.sessionId) {
        console.log('deleteAllCart');
        let x = await deleteAllCart(userId!)
        console.log('deletedAllCart');
        console.log('createPurchased');
        console.log(x);
        if (x?.cartData?.length) {
            await createPurchased(userId!, x?.cartData!)
            console.log('createdPurchased');
        }
    }

    return (
        <Link href='/'>Thank you</Link>
    )
}
export default page