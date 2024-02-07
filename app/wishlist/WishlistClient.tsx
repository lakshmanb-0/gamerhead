'use client'
import { GameCard } from '@/components/ui/GameCard'
import { TSingleGameData } from '@/types'
import React from 'react'

export const WishlistClient = ({ buyData }: { buyData: TSingleGameData[] }) => {

    return (
        <div>
            <h1 className="text-3xl">Wishlist</h1>
            <div className="h-1 my-1 rounded w-[7%] bg-gradient-to-r from-[#fe1f94] to-[#fd2adf]" />
            <div className="py-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {buyData?.map((el) =>
                    <GameCard item={el} key={el.steam_appid} />
                )}
            </div>
        </div>
    )
}
