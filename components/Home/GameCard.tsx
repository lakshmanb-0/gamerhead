'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import ImageBox from './ImageBox';
import { Card, Tooltip } from 'antd';

type Props = {
    item: any
    dlc?: boolean;
}
const GameCard: React.FC<Props> = ({ item, dlc }) => {
    const router = useRouter();

    const handlePrice = (item: any) => {
        return '₹' + Number(item?.final_price || item?.price_overview?.final) / 100 || Number(item?.original_price || item?.price_overview?.initial || 0) / 100
    }

    const navigate = () => {
        router.push(`/game/${item.id ?? item?.steam_appid}`)
    }

    return (
        <Card
            onClick={navigate}
            hoverable
            className='border-none overflow-hidden'
            bodyStyle={{ padding: 0 }}
            cover={
                <div className="relative">
                    <ImageBox realImage={item?.header_image} />
                    {
                        (!!item?.discount_percent || !!item?.price_overview?.discount_percent) &&
                        <div className="absolute top-1 right-1 px-2 sm:px-4 py-1 text-sm sm:text-lg z-10 text-green_color bg-[#212224] rounded rounded-tr-xl">
                            -{item.discount_percent ?? item?.price_overview?.discount_percent}%
                        </div>
                    }
                </div>
            }
        >
            <div className=" flex justify-between gap-2 items-start py-5 px-4">
                <Tooltip title={item.name}>
                    <b className='truncate'>{item.name}</b>
                </Tooltip>
                <p className="text-default-500">{item?.is_free ? 'Free' : handlePrice(item)}</p>
            </div>
        </Card>
    )
}

export default GameCard
