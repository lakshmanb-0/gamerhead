import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
} from "@nextui-org/react";
import Image from "next/image";
import "plyr-react/plyr.css";
import { AiFillWindows } from "react-icons/ai";
import { RiMacLine } from "react-icons/ri";
import { DiLinux } from "react-icons/di";
import { TDlcData, TSingleGameData } from '@/types';
import ImageBox from '../ImageBox';
import { useRouter } from 'next/navigation';
import Dlc from '../LandingUi/Dlc';
import { getDlc } from '@/app/server.ts/apiCalls';

const TopReleaseCard = ({ item }: { item: TSingleGameData }) => {
    const [currentImage, setCurrentImage] = useState<string>(item?.screenshots?.[0]?.path_thumbnail ?? '/noImage.jpeg');
    const [dlcData, setDlcData] = useState<TDlcData | any>()

    const router = useRouter();

    useEffect(() => {
        const fetchDlc = async () => {
            const dlcData = await getDlc(item?.steam_appid);
            setDlcData(dlcData)
        }
        fetchDlc()
    }, [])

    const handleClick = (id: number) => {
        router.push(`/GameProfile/${id}`);
    };

    return (
        <>
            <Card
                shadow="sm"
                key={item.steam_appid}
                className={`max-w-[1060px] mx-auto my-20 ${dlcData?.dlc.length && 'mb-0'}`}
            >
                <CardHeader className="flex justify-between items-center px-6 py-4">
                    <h1 className="text-xl font-bold">{item.name}</h1>
                    <div>
                        <div className="flex gap-2 items-center">
                            {!!item?.price_overview?.discount_percent ? (
                                <>
                                    <span className="text-xl">
                                        {item?.price_overview?.final_formatted}
                                    </span>
                                    <span className="line-through opacity-60 text-xl">
                                        {item?.price_overview?.initial_formatted}{" "}
                                    </span>
                                </>
                            ) : (
                                <span className="text-xl">
                                    {item?.price_overview?.final_formatted
                                        ?? (item?.release_date?.coming_soon
                                            ? "Coming soon"
                                            : "Free to Play")}
                                </span>
                            )}
                        </div>
                    </div>
                </CardHeader>

                <CardBody className="grid grid-cols-3 gap-5">
                    <section className="col-span-2 flex flex-col gap-4">
                        <ImageBox realImage={currentImage} onClick={() => handleClick(item.steam_appid)} />
                        <section className="overflow-x-scroll flex gap-3 py-3">
                            {item?.screenshots?.map((item) => (
                                <Image
                                    key={item?.id}
                                    src={item?.path_thumbnail ?? '/noImage.jpeg'}
                                    width={1080} height={1920} alt='hello'
                                    className={`w-[150px] object-cover aspect-video cursor-pointer ${currentImage == item.path_thumbnail && 'border-2 border-white'}`}
                                    onClick={() => { setCurrentImage(item.path_thumbnail) }} />
                            ))}
                        </section>
                    </section>

                    <section>
                        <div className="relative cursor-pointer" onClick={() => handleClick(item.steam_appid)}>
                            <ImageBox realImage={item?.header_image} />
                            {!!item?.price_overview?.discount_percent && <div className="absolute top-0 right-0 px-4 py-1 text-lg  z-10 text-green_color bg-[#212224]">
                                {item?.price_overview?.discount_percent}%
                            </div>}
                        </div>
                        <p className="py-3 opacity-60">{item.short_description}</p>
                        <section className="py-3 flex flex-col gap-1">
                            <div className="grid grid-cols-2">
                                <h1>Release Date:</h1>
                                <p className="opacity-60">{item.release_date?.date}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <h1>Developer:</h1>
                                <p className="opacity-60">{item.developers}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <h1>Total Reviews:</h1>
                                <p className="opacity-60">{item?.recommendations?.total?.toLocaleString('en') ?? 0}</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <h1 >Platform:</h1>
                                <div className="flex items-center gap-2">
                                    {item?.platforms?.windows && <AiFillWindows />}
                                    {item?.platforms?.mac && <RiMacLine />}
                                    {item?.platforms?.linux && <DiLinux />}
                                </div>
                            </div>
                        </section>
                    </section>
                </CardBody>
            </Card>
            <div className="max-w-[1060px] mx-auto">
                <Dlc dlcData={dlcData} />
            </div>
        </>
    )
}

export default TopReleaseCard