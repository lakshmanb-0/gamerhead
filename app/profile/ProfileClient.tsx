'use client'
import { GameCard } from '@/components/ui/GameCard'
import { TSingleGameData } from '@/types'
import React from 'react'

type TProfileProps = {
    wishlist: TSingleGameData[],
    visited: TSingleGameData[],
    purchased: TSingleGameData[]
}
export const ProfileClient = ({ wishlist, visited, purchased }: TProfileProps) => {
    return (
        <section>
            {!!visited.length && <div className="py-5 sm:py-10 px-4">
                <h1 className="font-bold text-3xl sm:text-4xl py-4">Last Visited</h1>
                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-6 ">
                    {visited?.map((item: any) => (
                        <GameCard item={item} key={item.id} />
                    ))}
                </div>
            </div>}
            {!!wishlist.length && <div className="py-5 sm:py-10 px-4">
                <h1 className="font-bold text-3xl sm:text-4xl py-4">Wishlist</h1>
                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-6 ">
                    {wishlist?.map((item: any) => (
                        <GameCard item={item} key={item.id} />
                    ))}
                </div>
            </div>}
            {!!purchased.length && <div className="py-5 sm:py-10 px-4">
                <h1 className="font-bold text-3xl sm:text-4xl py-4">Last Purchased</h1>
                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-6 ">
                    {purchased?.map((item: any) => (
                        <GameCard item={item} key={item.id} />
                    ))}
                </div>
            </div>}
        </section>
    )
}
