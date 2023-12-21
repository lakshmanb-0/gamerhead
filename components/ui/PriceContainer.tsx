import { TSingleGameData } from '@/types'
import React from 'react'
import { BiCartAlt } from 'react-icons/bi'

export const PriceContainer = ({ data }: { data: TSingleGameData }) => {
    return (
        <div className="justify-self-center">
            {data?.price_overview ? (
                data.price_overview.discount_percent > 0 ? (
                    <>
                        <div className="flex items-center gap-4 py-3">
                            <span className=" border-2 border-[#7360ed] py-1 px-3">
                                {"-"}
                                {data.price_overview.discount_percent}%{" "}
                            </span>
                            <span className="line-through text-[#a3a3a3] text-xl">
                                {data.price_overview.initial_formatted}{" "}
                            </span>
                        </div>

                        <div className="text-xl bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] flex items-center gap-3 px-4 py-2 cursor-pointer">
                            <BiCartAlt className="text-2xl" />
                            <span>
                                {data.price_overview.final_formatted}
                            </span>
                        </div>
                    </>
                ) : (
                    <span className="text-xl bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] flex items-center gap-3 px-4 py-2 cursor-pointer">
                        <BiCartAlt className="text-2xl" />
                        {data.price_overview.final_formatted ?? "Free to Play"}
                    </span>
                )
            ) : (
                <span className="text-xl bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] flex items-center gap-3 px-4 py-2 cursor-pointer">
                    {data?.release_date?.coming_soon ? "Coming Soon"
                        : data.is_free ? "Free to Play" : "Free"}
                </span>
            )}
        </div>
    )
}
