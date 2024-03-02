'use client'
import TopReleaseCard from "@/components/LoadingInfinite/TopReleaseCard";
import { TSingleGameData } from "@/types";
import React from "react";

const Search = ({ searchData, searchInput }: { searchData: TSingleGameData[], searchInput: string }) => {

    return (
        <div className="px-10">
            <h1 className="text-3xl">{searchInput.replaceAll('%20', ' ')}</h1>
            <div className="h-1 my-1 rounded w-[7%] bg-gradient-to-r from-[#fe1f94] to-[#fd2adf]" />
            <section>
                {!!searchData.length ? searchData?.map(item => !item?.content_descriptors?.ids?.includes(4) && (
                    <TopReleaseCard item={item} key={item.steam_appid} />
                )
                ) : <div className="flex  flex-col gap-3 p-4 w-full items-center justify-center">
                    <img src="/no_game.gif" alt="" className="w-60" />
                    <h1 className="text-5xl font-bold tracking-widest text-green_color ">NOT FOUND</h1>
                    <p className="text-3xl font-bold tracking-widest">GAMES</p>
                </div>}
            </section>
        </div>
    );
};
export default Search

