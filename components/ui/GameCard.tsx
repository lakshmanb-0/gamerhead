import { Card, CardBody, CardFooter } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import ImageBox from '../ImageBox';
import { TGameData } from '@/types';

export const GameCard = ({ item, heading }: { item: TGameData, heading?: string }) => {
    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`/GameProfile/${id}`);
    };

    const handlePrice = (item: TGameData) => {
        if (heading == 'Upcoming') return 'Coming Soon'
        else if (item.final_price == 0) return 'Free'
        else return '₹' + Number(item?.final_price) / 100 ?? Number(item?.original_price) / 100
    }

    return (
        <Card shadow="sm" key={item.id} isPressable onPress={() => handleClick(item.id)}>
            <CardBody className="overflow-visible p-0 relative">
                <ImageBox realImage={item?.header_image} errorImage={item?.large_capsule_image} customStyle={'rounded-lg'} />
                {!!item?.discount_percent && <div className="absolute top-0 right-0 px-4 py-1 text-lg  z-10 text-green_color bg-[#212224]">
                    {item.discount_percent}%
                </div>}
            </CardBody>
            <CardFooter className="text-small justify-between">
                <b>{item.name}</b>
                <p className="text-default-500">{handlePrice(item)}</p>
            </CardFooter>
        </Card>
    )
}
