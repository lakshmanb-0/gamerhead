'use client'
// import { useAuth, useUser } from '@clerk/nextjs';
import { Image } from '@nextui-org/react';
import React from 'react'

type TImageType = {
    errorImage?: string,
    realImage?: string,
    customStyle?: string,
    zoomed?: boolean,
    onClick?: any
};


export default function ImageBox(item: TImageType) {

    return (
        <Image
            width={1920}
            height={1080}
            isZoomed={item?.zoomed ?? true}
            src={item?.realImage}
            fallbackSrc='./noImage.jpeg'
            alt='Picture'
            onClick={() => item.onClick}
            className={`object-cover h-full w-full ${item?.customStyle} ${item.onClick && 'cursor-pointer'}`}
        />
    )
}
