import { Card, CardBody, CardFooter, Tooltip } from '@nextui-org/react';
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

export const GameCard = ({ item, heading, dlc }: { item: TGameCard, heading?: string, dlc?: boolean }) => {
    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`/GameProfile/${id}`);
    };

    const handlePrice = (item: TGameCard) => {
        if (heading == 'Upcoming') return 'Upcoming'
        else if (item?.final_price == 0 || item?.price_overview?.final == 0) return 'Free'
        else return '₹' + Number(item?.final_price ?? item?.price_overview?.final ?? 0) / 100 ?? Number(item?.original_price ?? item?.price_overview?.initial ?? 0) / 100
    }

    return (
        <Card shadow="sm" key={item.id} isPressable onPress={() => handleClick(item.id ?? item?.steam_appid ?? 0)} className={dlc && `min-w-[200px] sm:min-w-[300px]`} >
            <CardBody className="overflow-hidden p-0 relative">
                <ImageBox realImage={item?.header_image} errorImage={item?.large_capsule_image} customStyle={'rounded-lg'} />
                {(!!item?.discount_percent || !!item?.price_overview?.discount_percent) && <div className="absolute top-0 right-0 px-2 sm:px-4 py-1 text-sm sm:text-lg z-10 text-green_color bg-[#212224]">
                    {item.discount_percent ?? item?.price_overview?.discount_percent}%
                </div>}
            </CardBody>
            <CardFooter className="text-small justify-between gap-4 items-start">
                <Tooltip content={item.name}>
                    <b className='truncate'>{item.name}</b>
                </Tooltip>
                <p className="text-default-500">{handlePrice(item) == '₹0' ? 'Free' : handlePrice(item)}</p>
            </CardFooter>
        </Card>
    )
}
