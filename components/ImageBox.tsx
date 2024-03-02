'use client'
// import { useAuth, useUser } from '@clerk/nextjs';
import { Image } from '@nextui-org/react';
import React from 'react'

type TImageType = {
    errorImage?: string,
    realImage?: string,
    customStyle?: string,
    zoomed?: boolean,
    noBlurred?: boolean,
    onClick?: any
};


export default function ImageBox(item: TImageType) {
    return (
        <div className='bg-cover bg-center bg-no-repeat' style={{ backgroundImage: "url('/noImage.png')" }}>
            <Image
                width={1920}
                height={1080}
                isZoomed={item?.zoomed ?? true}
                isBlurred={item?.noBlurred ?? true}
                src={item?.realImage}
                alt='Picture'
                onClick={() => item.onClick}
                className={`object-cover aspect-video h-full w-full ${item?.customStyle} ${item.onClick && 'cursor-pointer'}`}
            />
        </div>

    )
}
