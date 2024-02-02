import React, { useEffect, useRef, useState } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
} from "@nextui-org/react";
import ModalVideo from "../ui/ModalVideo";
import Image from "next/image";
import { PlayCircleIcon } from "lucide-react";
import Plyr, { APITypes } from "plyr-react";
import "plyr-react/plyr.css";
import { AiFillWindows } from "react-icons/ai";
import { RiMacLine } from "react-icons/ri";
import { DiLinux } from "react-icons/di";
import { TSingleGameData } from '@/types';
import ImageBox from '../ImageBox';
// import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';

const TopReleaseCard = ({ item }: { item: TSingleGameData }) => {
    const [type, setType] = useState<number>(0);
    const [typeData, setTypeData] = useState<string>(item?.screenshots?.[0]?.path_full ?? '');
    const PlayerRef = useRef<APITypes>(null)

    // const { ref, inView } = useInView({
    //     threshold: 0,
    // });

    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`/GameProfile/${id}`);
    };

    // useEffect(() => {
    //     let player = PlayerRef?.current?.plyr as Plyr
    //     if (inView) {
    //         console.log(player)
    //         console.log(player.source)
    //         if (player.source) {
    //             player.muted = true;
    //             (PlayerRef?.current?.plyr as Plyr).play();
    //         }
    //     }
    //     // else {
    //     //     console.log(player);
    //     //     if (player.source) {
    //     //         player.muted = true;
    //     //         player.pause();
    //     //     }
    //     // }
    // }, [inView, PlayerRef])

    return (
        <Card
            shadow="sm"
            key={item.steam_appid}
            className="max-w-[1060px] mx-auto my-20"
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
                    {/* {type == 0 ?
                        <div>
                            <Plyr
                                autoPlay
                                ref={PlayerRef}
                                source={{
                                    type: "video",
                                    sources: [
                                        { src: typeData }
                                    ]
                                }}
                            />
                        </div>
                        : <ImageBox realImage={typeData!} />
                    } */}
                    <ImageBox realImage={typeData} onClick={() => handleClick(item.steam_appid)} />

                    <section className="overflow-x-scroll flex gap-3 py-3">
                        {/* {item?.movies?.map((item) => (
                            <div className="w-full aspect-video relative" onClick={() => { setType(0); setTypeData(item.mp4?.max); }} key={item.id}>
                                <Image src={item?.thumbnail ?? '/noImage.jpeg'} width={1080} height={1920} alt='hello' className="w-[150px] object-cover aspect-video" />
                                <PlayCircleIcon className="absolute top-0 left-0 w-full h-full p-5" />
                            </div>
                        ))} */}
                        {item?.screenshots?.map((item) => (
                            <Image key={item?.id} src={item?.path_thumbnail ?? '/noImage.jpeg'} width={1080} height={1920} alt='hello' className={`w-[150px] object-cover aspect-video cursor-pointer ${typeData == item.path_full && 'border-2 border-white'}`} onClick={() => { setType(1); setTypeData(item.path_full) }} />
                        ))}
                    </section>
                </section>


                <section>
                    <div className="relative">
                        <ImageBox realImage={item?.header_image} onClick={() => handleClick(item.steam_appid)} />
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
                            <p className="opacity-60">{item?.recommendations?.total?.toLocaleString('en')}</p>
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
    )
}

export default TopReleaseCard