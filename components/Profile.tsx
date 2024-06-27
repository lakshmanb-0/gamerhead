'use client'
import { RootState } from '@/components/redux/store/store'
import { GameCard } from '@/components/index'
import React from 'react'
import { useSelector } from 'react-redux'
import { StoreData } from '@/components/redux/reducers/auth.reducers'

type TProfileProps = {
    wishlist: StoreData[],
    purchased: StoreData[]
}

const Profile = () => {
    const state = useSelector((state: RootState) => state.auth)
    return (
        <section>
            {
                (!!state?.wishlistData?.length)
                    ? <div className="py-5 sm:py-10 px-4">
                        <h1 className="font-bold text-3xl sm:text-4xl py-4">Wishlist</h1>
                        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-6 ">
                            {state?.wishlistData?.map((item: any) => (
                                <GameCard item={item} key={item.steam_appid} />
                            ))}
                        </div>
                    </div>
                    : <section className="flex justify-center items-center flex-col text-center ">
                        <img src="./empty_wishlist.png" className="w-80" />
                        <h1 className="font-bold text-5xl text-center">Wishlist awaits epic quests</h1>
                        <p className="text-default-500 pt-4">Your quest log seems devoid of wishlist entries. Embark on an adventure and discover new realms by adding games to your Wishlist!</p>
                    </section>
            }

            {
                !!state.purchasedData?.length && <div className="py-5 sm:py-10 px-4">
                    <h1 className="font-bold text-3xl sm:text-4xl py-4">Last Purchased</h1>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-6 ">
                        {state.purchasedData?.map((item: any) => (
                            <GameCard item={item} key={item.steam_appid} />
                        ))}
                    </div>
                </div>
            }

            {
                !!state.lastVisitedData?.length && <div className="py-5 sm:py-10 px-4">
                    <h1 className="font-bold text-3xl sm:text-4xl py-4">Last Visited</h1>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-6 ">
                        {state.lastVisitedData?.map((item: any) => (
                            <GameCard item={item} key={item.steam_appid} />
                        ))}
                    </div>
                </div>
            }
        </section>
    )
}
export default Profile
