'use client'
import { RootState } from '@/components/redux/store/store'
import { GameCard } from '@/components/ui/GameCard'
import { TSingleGameData } from '@/types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAppDetails } from '../server.ts/apiCalls'

type TProfileProps = {
    wishlist: TSingleGameData[],
    visited: TSingleGameData[],
    purchased: TSingleGameData[]
}
export const ProfileClient = ({ wishlist, visited, purchased }: TProfileProps) => {
    const state = useSelector((state: RootState) => state.auth)
    const [wishlistLocal, setWishlistLocal] = useState<TSingleGameData[]>([])

    useEffect(() => {
        const fetchCartData = async () => {
            let wish: TSingleGameData[] | any[] = [];

            wish = await Promise.all((state.wishlistData ?? [])?.map(async (id) => {
                const response = await getAppDetails(id);
                return response[id]?.data
            }))
            setWishlistLocal(wish)
        }
        !!!wishlist?.length && fetchCartData()
    }, [])

    return (
        <section>
            {(!!wishlist.length || !!wishlistLocal?.length) && <div className="py-5 sm:py-10 px-4">
                <h1 className="font-bold text-3xl sm:text-4xl py-4">Wishlist</h1>
                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-6 ">
                    {(!!wishlist?.length ? wishlist : wishlistLocal)?.map((item: any) => (
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
            {!!visited.length && <div className="py-5 sm:py-10 px-4">
                <h1 className="font-bold text-3xl sm:text-4xl py-4">Last Visited</h1>
                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-6 ">
                    {visited?.map((item: any) => (
                        <GameCard item={item} key={item.id} />
                    ))}
                </div>
            </div>}
        </section>
    )
}
