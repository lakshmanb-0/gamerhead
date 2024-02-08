import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react'

export default function Custom404() {
    return (
        <section className="relative h-screen overflow-hidden bg-cover bg-center w-full grid items-center justify-center" style={{ backgroundImage: "url('/404.png')" }}>
            <div className="bg-[rgba(0,0,0,0.5)] z-10 absolute top-0 left-0 w-full h-full" />
            <div className=" w-full text-center z-20 flex gap-10 flex-col">
                <h1 className="text-9xl sm:text-[10rem] font-bold">404</h1>
                <h6 className="text-4xl sm:text-5xl">Page Not Found</h6>
                <Link href='/'>
                    <Button className='w-fit mx-auto' >Back to Home</Button>
                </Link>
            </div>
        </section>
    )
}
