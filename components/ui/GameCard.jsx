'use client'
import { Card, CardBody, CardFooter, Tooltip } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ImageBox from '../ImageBox';
import { useInView } from 'react-intersection-observer';
import { XCircleIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useUser } from '@clerk/nextjs';
import { deleteCart } from '@/app/server.ts/prismaDb';
import { addCart, removeFromCart } from '../redux/reducers/auth.reducers';

export const GameCard = (props) => {
    const { item, heading, dlc } = props
    const router = useRouter();
    const [removeCart, setRemoveCart] = useState(false)
    const pathname = usePathname();
    const dispatch = useDispatch()
    const { user } = useUser();
    const [ref, inView] = useInView({
        triggerOnce: true,
    });
    useEffect(() => {
        if (pathname == '/cart') {
            setRemoveCart(true)
        }
    }, [pathname])

    const handleClick = (id) => {
        router.push(`/GameProfile/${id}`);
    };

    const handleRemove = async () => {
        dispatch(removeFromCart(item?.id ?? item?.steam_appid))
        toast.success("Mission Abandoned ");
        let x;
        if (user) {
            x = await deleteCart(user?.id, item.id ?? item?.steam_appid ?? 0)
            dispatch(addCart(x?.cartData))
        }
        console.log(x);
    }

    const handlePrice = (item) => {
        if (heading == 'Upcoming') return 'Upcoming'
        else if (item?.final_price == 0 || item?.price_overview?.final == 0) return 'Free'
        else return '₹' + Number(item?.final_price ?? item?.price_overview?.final ?? 0) / 100 ?? Number(item?.original_price ?? item?.price_overview?.initial ?? 0) / 100
    }

    return (
        <>
            <div ref={ref} className={`${inView && 'hidden'}`} />
            <Card shadow="sm" key={item.id} isPressable
                onPress={() => removeCart ? handleRemove() : handleClick(item.id ?? item?.steam_appid ?? 0)}
                className={` ${!inView && 'hidden'} ${dlc && 'min-w-[200px] sm:min-w-[300px]'}`}
            >
                <CardBody className="overflow-hidden p-0 relative">
                    <ImageBox realImage={item?.header_image} zoomed={!removeCart ? true : false} />
                    {(!!item?.discount_percent || !!item?.price_overview?.discount_percent) && <div className="absolute top-1 right-1 px-2 sm:px-4 py-1 text-sm sm:text-lg z-10 text-green_color bg-[#212224] rounded rounded-tr-xl">
                        -{item.discount_percent ?? item?.price_overview?.discount_percent}%
                    </div>}
                    {removeCart && <div className="absolute top-1 left-1 z-10 " onClick={() => handleRemove}>
                        <XCircleIcon size={30} className='bg-[#212224] rounded-full' />
                    </div>}
                </CardBody>
                <CardFooter className="text-small justify-between gap-4 items-start">
                    <Tooltip content={item.name}>
                        <b className='truncate'>{item.name}</b>
                    </Tooltip>
                    <p className="text-default-500">{handlePrice(item) == '₹0' ? 'Free' : handlePrice(item)}</p>
                </CardFooter>
            </Card>
        </>
    )
}
