'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton';

type TImageType = {
    errorImage: string,
    realImage: string
    customStyle?: string
};

export default function ImageBox(item: TImageType) {
    const [imgSrc, setImgSrc] = useState(item?.realImage)

    useEffect(() => {
        setImgSrc(item?.realImage)
    }, [item])

    return (
        <div>
            <Image
                src={imgSrc}
                width={1080}
                height={1920}
                loading='lazy'
                onError={() => setImgSrc(item?.errorImage)}
                alt='Loading...'
                className={item?.customStyle}
            />
        </div >
    )
}
