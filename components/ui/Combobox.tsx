"use client"
import React, { useState } from "react"
import ImageBox from "../ImageBox"
import { useRouter } from "next/navigation"

export function Combobox({ data }) {
    const router = useRouter()
    return (
        <section className="absolute top-10 left-0 w-full flex flex-col gap-2 bg-[#121212] p-1">
            {data?.map((item) => (
                <div className="flex gap-2 items-center relative" onClick={() => router.push(`/GameProfile/${item?.appid}`)}>
                    <ImageBox realImage={item?.icon} errorImage={item?.logo} customStyle="w-5" />
                    <h1>{item.name}</h1>
                    <ImageBox realImage={item?.logo} errorImage={item?.icon} customStyle="aspect-video absolute top-0 left-0 opacity-10" />
                </div>
            ))}
        </section>

    )
}
