'use client'
import React, { useState } from 'react'
import Image from 'next/image';

type TImageType = {
    realImage?: string,
    customStyle?: string,
    [key: string]: any
};

const ImageBox: React.FC<TImageType> = ({ realImage = '/noImage.png', customStyle, ...props }) => {
    const [url, setUrl] = useState<string>(realImage);

    return (
        <Image
            src={url}
            alt='Picture'
            onError={() => setUrl('/noImage.png')}
            width={1920}
            height={1080}
            className={`object-cover h-full w-full rounded ${customStyle}`}
            {...props}
        />
    )
}
export default React.memo(ImageBox)
