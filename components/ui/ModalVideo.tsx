import React from 'react'
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Dialog, DialogContent, DialogTrigger } from './dialog';
import ImageBox from '../ImageBox';

type TModalVideo = {
    item: {
        thumbnail: string,
        mp4: { max: string }
    }
}

export default function ModalVideo({ item }: TModalVideo) {
    return (
        <Dialog>
            <DialogTrigger className='aspect-video'>
                <ImageBox realImage={item?.thumbnail} errorImage={item?.thumbnail} />
            </DialogTrigger>
            <DialogContent>
                <div className="aspect-video rounded-lg">
                    <Plyr
                        poster={item?.thumbnail}
                        source={{
                            type: "video",
                            poster: item?.thumbnail,
                            sources: [{ src: item?.mp4?.max }]
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
