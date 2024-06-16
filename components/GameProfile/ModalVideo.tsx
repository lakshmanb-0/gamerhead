'use client'
import React, { useState } from 'react'
import { ImageBox } from '../index';
import { FaPlay } from '../reactIcons'
import { Modal } from 'antd';

const ModalVideo: React.FC<{ item: any }> = ({ item }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    console.log('modal render')
    return (
        <>
            <div onClick={showModal} className='relative cursor-pointer min-w-[300px]' >
                <ImageBox realImage={item.thumbnail} customStyle={'rounded-xl z-0'} />
                <div className='absolute top-0 left-0 w-full h-full grid place-items-center'>
                    <FaPlay size={40} className="w-fit h-fit" />
                </div>
            </div>
            <Modal
                onCancel={handleCancel}
                centered
                maskClosable
                title={item.name}
                open={isModalOpen}
                footer={null}
            >
                <div className="aspect-video rounded-lg w-full">
                    <video controls autoPlay >
                        <source src={item.mp4?.max!} type="video/mp4" />
                    </video>
                </div>
            </Modal>
        </>
    )
}
export default React.memo(ModalVideo)