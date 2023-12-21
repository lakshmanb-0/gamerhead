import React from 'react'
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Dialog, DialogContent, DialogTrigger } from './dialog';
import ImageBox from '../ImageBox';
import { TSingleGameData } from '@/types';

type ModalVideo = {
    id?: number,
    name?: string,
    thumbnail?: string,
    webm?: {
        480?: string,
        max?: string
    },
    mp4?: {
        480?: string,
        max?: string
    },
    highlight?: boolean
}

export default function ModalVideo({ item }: { item: ModalVideo }) {
    return (
        <Dialog>
            <DialogTrigger className='aspect-video'>
                <ImageBox realImage={item?.thumbnail} errorImage={item?.thumbnail} />
            </DialogTrigger>
            <DialogContent>
                <div className="aspect-video rounded-lg w-[70vw]">
                    <Plyr
                        poster={item?.thumbnail}
                        source={{
                            type: "video",
                            poster: item?.thumbnail,
                            sources: [
                                { src: item?.mp4?.max ?? '' }
                            ]
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
