import Link from "next/link";
import React from "react";

type Props = {
    searchData: {
        appid: number
        name: string
        logo: string
    }[]
    searchInput: string
}
const Search = ({ searchData, searchInput }: Props) => {
    return (
        <div className="px-10">
            <h1 className="text-3xl">{searchInput.replaceAll('%20', ' ')}</h1>
            <div className="h-1 my-1 rounded w-[7%] bg-gradient-to-r from-[#fe1f94] to-[#fd2adf]" />
            <section>
                {!!searchData.length ? searchData?.map(item => (
                    <Link href={`/game/${item.appid}`} key={item.appid} className="flex items-center gap-3 my-3 hover:bg-[#fe1f94]">
                        <img src={item.logo} alt={item.name} className="w-fit" />
                        <h1>{item.name}</h1>
                    </Link>
                ))
                    : <div className="flex  flex-col gap-3 p-4 w-full items-center justify-center">
                        <img src="/no_game.gif" alt="" className="w-60" />
                        <h1 className="text-5xl font-bold tracking-widest text-green_color ">NOT FOUND</h1>
                        <p className="text-3xl font-bold tracking-widest">GAMES</p>
                    </div>}
            </section>
        </div>
    );
};
export default Search

