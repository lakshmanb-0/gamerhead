'use client'
// import { useAuth, useUser } from '@clerk/nextjs';
import { Image } from '@nextui-org/react';
import React from 'react'

type TImageType = {
    errorImage?: string,
    realImage?: string,
    customStyle?: string
};


export default function ImageBox(item: TImageType) {

    return (
        <Image
            isZoomed
            width={1920}
            height={1080}
            src={item?.realImage}
            fallbackSrc={item?.errorImage}
            alt='Picture'
            className={item?.customStyle}
        />
    )
}
