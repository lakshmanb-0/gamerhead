import Image from "next/image";
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
        <div className="px-4 sm:px-10 py-10 maxWidth">
            <h1 className="text-3xl">{searchInput.replaceAll('%20', ' ')}</h1>
            <div className="h-1 my-1 rounded w-[7%] bg-gradient-to-r from-[#fe1f94] to-[#fd2adf]" />
            <section className="space-y-10 pt-10">
                {!!searchData.length ? searchData?.map(item => (
                    <Link href={`/game/${item.appid}`} key={item.appid} className="flex items-center w-full gap-3 bg-black/40 overflow-hidden rounded-xl hover:shadow-2xl hover:bg-primary transition-all ease-in-out duration-500 hover:scale-95">
                        <Image src={item.logo} alt={item.name} className="w-fit" width={1920} height={1080} />
                        <h1 className="font-bold p-3 max-w-[50%] line-clamp-2 text-center">{item.name}</h1>
                    </Link>
                ))
                    : <div className="flex flex-col gap-3 p-4 w-full items-center justify-center">
                        <img src="/no_game.gif" alt="" className="w-60" />
                        <h1 className="text-5xl font-bold tracking-widest text-green_color ">NOT FOUND</h1>
                        <p className="text-3xl font-bold tracking-widest">GAMES</p>
                    </div>}
            </section>
        </div>
    );
};
export default Search

