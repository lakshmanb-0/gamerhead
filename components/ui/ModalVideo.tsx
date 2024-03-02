import React from 'react'
import { PlayCircleIcon } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import ImageBox from './ImageBox';

type TModalVideo = {
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

export default function ModalVideo({ item }: { item: TModalVideo }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div onClick={onOpen} className='min-w-[300px] relative cursor-pointer'>
                <ImageBox realImage={item?.thumbnail} customStyle={'rounded-xl'} />
                <PlayCircleIcon className="absolute top-0 left-0 w-full h-full p-14 z-10" />
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='sm:max-w-[70%] lg:max-w-[60%] m-auto'>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{item.name}</ModalHeader>
                            <ModalBody>
                                <div className="aspect-video rounded-lg  w-full">
                                    <video controls autoPlay >
                                        <source src={item.mp4?.max!} type="video/mp4" />
                                    </video>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
