'use client'
import { TSingleGameData } from '@/types'
import React from 'react'
import { ImageBox, ModalVideo } from '../index'

type Props = {
    movies?: TSingleGameData['movies'],
    screenshots?: TSingleGameData['screenshots'],
    type: string
}
const Movies: React.FC<Props> = ({ movies, screenshots, type }) => {
    return (!!movies?.length || !!screenshots?.length) && (
        <section className="py-5 sm:py-10 maxWidth">
            <div className="py-4">
                <h1 className="font-bold text-4xl capitalize">{type}</h1>
                <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
            </div>
            <div className=" flex gap-4 overflow-auto py-5 ">
                {movies?.map((item) => (
                    <ModalVideo item={item} key={item.id} />
                ))}
                {screenshots?.map((item) => (
                    <ImageBox realImage={item.path_thumbnail} customStyle={'cursor-pointer'} key={item.id} onClick={() => window.open(item.path_full)} />
                ))}
            </div>
        </section>
    )
}
export default Movies