"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react"
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
        if (searchInput.length) { fetchData() }
        async function fetchData() {
            const data = await getSearch(searchInput)
            setSearchData(data)
        }
    }, [searchInput])

    // handleSubmit 
    const handleSearchPage = () => {
        router.push(`/search/${searchInput}`)
        setSearchInput("");
    }

    // handleClick 
    function handleClick(id: string) {
        router.push(`/GameProfile/${id}`);
        setSearchInput("");
    }


    return (
        <Autocomplete
            defaultItems={searchData}
            size={'sm'}
            inputValue={searchInput}
            label="Select a Game"
            onKeyDown={(e: KeyboardEvent) => e.key === 'Enter' && handleSearchPage()}
            onInputChange={(e: string) => setSearchInput(e)}
            shouldCloseOnBlur={true}
            className="max-w-xs"
        >
            {(el: SearchDropdown) =>
                <AutocompleteItem
                    onClick={() => handleClick(el?.appid)}
                    key={el.name}
                    startContent={<Avatar className="w-6 h-6" src={el.icon} />}
                >{el.name}</AutocompleteItem>
            }
        </Autocomplete>
    )
}
