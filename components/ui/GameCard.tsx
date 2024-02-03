import { Card, CardBody, CardFooter } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import ImageBox from '../ImageBox';

export type TGameCard = {
    id?: number,
    steam_appid?: number,
    discount_percent?: number,
    final_price?: number,
    original_price?: number,
    name?: string,
    price_overview?: {
        final?: number,
        initial?: number,
        discount_percent?: number,
    }
    header_image?: string,
    large_capsule_image?: string,
}

export const GameCard = ({ item, heading }: { item: TGameCard, heading?: string }) => {
    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`/GameProfile/${id}`);
    };

    const handlePrice = (item: TGameCard) => {
        if (heading == 'Upcoming') return 'Coming Soon'
        else if (item?.final_price == 0 || item?.price_overview?.final == 0 || !!!item?.price_overview) return 'Free to Play'
        else return '₹' + Number(item?.final_price ?? item?.price_overview?.final) / 100 ?? Number(item?.original_price ?? item?.price_overview?.initial) / 100
    }

    return (
        <Card shadow="sm" key={item.id} isPressable onPress={() => handleClick(item.id ?? item?.steam_appid ?? 0)} >
            <CardBody className="overflow-visible p-0 relative">
                <ImageBox realImage={item?.header_image} errorImage={item?.large_capsule_image} customStyle={'rounded-lg'} />
                {!!item?.discount_percent && <div className="absolute top-0 right-0 px-4 py-1 text-lg  z-10 text-green_color bg-[#212224]">
                    {item.discount_percent}%
                </div>}
                {!!item?.price_overview?.discount_percent && <div className="absolute top-0 right-0 px-4 py-1 text-lg  z-10 text-green_color bg-[#212224]">
                    {item?.price_overview?.discount_percent}%
                </div>}
            </CardBody>
            <CardFooter className="text-small justify-between gap-4 items-start">
                <b>{item.name}</b>
                <p className="text-default-500">{handlePrice(item)}</p>
            </CardFooter>
        </Card>
    )
}
