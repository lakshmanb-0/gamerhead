'use client'
import React, { FC, memo, useEffect, useState } from 'react'
import { FaCheck } from '../reactIcons'
import { Table } from 'antd'

type Data = {
    key: number,
    name: string,
    interface: React.ReactNode,
    full_audio: React.ReactNode,
    subtitles: React.ReactNode
}
const SupportLanguages: FC<{ supported_languages: string[] }> = ({ supported_languages }) => {
    const [data, setData] = useState<Data[]>([]);
    const columns = [
        {
            title: '',
            dataIndex: 'name',
            key: 'interface',
        },
        {
            title: 'Interface',
            dataIndex: 'interface',
            key: 'interface',
        },
        {
            title: 'Full Audio',
            dataIndex: 'full_audio',
            key: 'full_audio',
        },
        {
            title: 'Subtitles',
            dataIndex: 'subtitles',
            key: 'subtitles',
        },
    ];

    useEffect(() => {
        if (supported_languages.length) {
            const newData = supported_languages.map((item, index) => {
                let firstString = item.split('<')[0];
                let secondString = item.split('<')[1];
                return {
                    key: index,
                    name: firstString,
                    interface: <FaCheck />,
                    full_audio: secondString?.includes('strong>*') && <FaCheck />,
                    subtitles: <FaCheck />,
                }
            })
            setData(newData)
        }
    }, [])

    return (
        <section>
            <div className="py-4">
                <h1 className="font-bold text-4xl">Languages:</h1>
                <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
            </div>
            <Table columns={columns} dataSource={data} pagination={false} />
        </section>
    )
}
export default memo(SupportLanguages)