'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ClientThankYou = () => {
    const router = useRouter();
    const [seconds, setSeconds] = useState(7)

    useEffect(() => {
        if (seconds > 0) {
            const timer = setInterval(() => setSeconds(prevSeconds => prevSeconds - 1), 1000);
            return () => clearInterval(timer);
        } else {
            router.push('/profile');
        }
    }, [seconds]);

    return (
        <section className="relative h-screen overflow-hidden bg-cover bg-center w-full grid items-center justify-center" style={{ backgroundImage: "url('/thankYou.jpg')" }}>
            <div className="bg-[rgba(0,0,0,0.5)] z-10 absolute top-0 left-0 w-full h-full" />
            <div className='text-center z-20 flex gap-10 flex-col'>
                <h1 className="text-6xl sm:text-9xl font-bold">Thanks for Purchasing</h1>
                <h6 className="text-xl sm:text-2xl">Redirecting to Profile page in {seconds} seconds</h6>
            </div>
        </section>
    )
}

export default ClientThankYou