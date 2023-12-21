"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, Card, Input } from "@nextui-org/react"
import { getSearch } from "@/app/server.ts/apiCalls"

export type SearchDropdown = {
    appid: string,
    icon: string,
    logo: string,
    name: string
}

export function SearchDropdown() {
    const [searchInput, setSearchInput] = useState<string>("");
    const [searchData, setSearchData] = useState<SearchDropdown[]>([])
    const router = useRouter()

    // getSearch Api 
    useEffect(() => {
        if (searchData) { fetchData() }
        async function fetchData() {
            const data = await getSearch(searchInput)
            setSearchData(data)
        }
    }, [searchInput])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        router.push(`/search/${searchInput}`)
        setSearchInput("");
    }

    // handleClick 
    function handleClick(id: string) {
        setSearchInput("");
        router.push(`/GameProfile/${id}`);
    }


    return (
        <form className="relative max-w-[400px] md:w-[400px]" onSubmit={handleSubmit}>
            <Input
                label="Search"
                value={searchInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
            />
            {searchData?.length ? <Card className='absolute top-16 left-0 w-full p-2' >
                {searchData?.map((item) => (
                    <div className="flex gap-3 items-center py-1 cursor-pointer" onClick={() => handleClick(item?.appid)}>
                        <Avatar src={item.icon} size="sm" className="" />
                        <p className="text-sm flex-1">{item.name}</p>
                    </div>
                ))}
            </Card> : <></>}
        </form>
    )
}