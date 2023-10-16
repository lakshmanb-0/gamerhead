'use client'
import Image from 'next/image'
import React from 'react'

type TImageType = {
    errorImage: string,
    realImage: string
    customStyle?: string
};

export default function ImageBox(item: TImageType) {
    const handleImageError = (event: any) => {
        event.target.src = item?.realImage
    };
    return (
        <Image
            src={item?.realImage}
            width={1080}
            height={1920}
            onError={handleImageError}
            alt={'Loading...'}
            className={item?.customStyle}
        />
    )
}
