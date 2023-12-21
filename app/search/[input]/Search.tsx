'use client'
import ImageBox from "@/components/ImageBox";
import { PriceContainer } from "@/components/ui/PriceContainer";
import { TSingleGameData } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BiCartAlt } from "react-icons/bi";

const Search = ({ searchData, searchInput }: { searchData: TSingleGameData[], searchInput: string }) => {
    const router = useRouter();
    console.log(searchData);

    // handle click event on image redirect to game profile image
    const handleClick = (id: number) => {
        router.push(`/GameProfile/${id}`);
    };

    return (
        <>
            <div className="px-10">
                <h1 className="text-3xl ">{`'${searchInput}'`}</h1>
                <div className="h-1 my-1 rounded w-[7%] bg-gradient-to-r from-[#fe1f94] to-[#fd2adf]" />
                <section>
                    {searchData?.map(item => (
                        <div
                            className="grid grid-cols-4 items-center  gap-4 bg-[#0f0f0f] my-8"
                            key={item.steam_appid}
                        >
                            {/* <div className="grid grid-cols-3 gap-4 items-center col-span-3 justify-self-start">
                                <div
                                    onClick={() => handleClick(item.steam_appid)}
                                    className="cursor-pointer"
                                >
                                    <ImageBox realImage={item?.header_image} errorImage={item?.background_raw} />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <h1 className="text-3xl font-bold">{item.name}</h1>
                                    <span className="text-[#288754]">In stock</span>
                                </div>
                            </div> */}

                            <PriceContainer data={item} />
                        </div>
                    )
                    )}
                </section>
            </div>
        </>
    );
};
export default Search

