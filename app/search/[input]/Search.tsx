'use client'
import TopReleaseCard from "@/components/LoadingInfinite/TopReleaseCard";
import { TSingleGameData } from "@/types";
import React from "react";

const Search = ({ searchData, searchInput }: { searchData: TSingleGameData[], searchInput: string }) => {
    console.log(searchData);

    return (
        <>
            <div className="px-10">
                <h1 className="text-3xl">{`'${searchInput}'`}</h1>
                <div className="h-1 my-1 rounded w-[7%] bg-gradient-to-r from-[#fe1f94] to-[#fd2adf]" />
                <section>
                    {searchData?.map(item => !item?.content_descriptors?.ids?.includes(4) && (
                        <TopReleaseCard item={item} key={item.steam_appid} />
                    )
                    )}
                </section>
            </div>
        </>
    );
};
export default Search

