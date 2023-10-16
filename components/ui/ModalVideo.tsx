import React from 'react'
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Dialog, DialogContent, DialogTrigger } from './dialog';
import Image from 'next/image';
import ImageBox from '../ImageBox';

export default function ModalVideo({ item }) {

    return (
        <Dialog>
            <DialogTrigger>
                <ImageBox realImage={item?.thumbnail} errorImage={item?.thumbnail} />
            </DialogTrigger>
            <DialogContent>
                <div className="aspect-video rounded-lg">
                    <Plyr
                        poster={item?.item?.thumbnail}
                        source={{
                            type: "video",
                            poster: item?.item?.thumbnail,
                            sources: [{ src: item?.item?.mp4?.max }]
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>


    )
}
