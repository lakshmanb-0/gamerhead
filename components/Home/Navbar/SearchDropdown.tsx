"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSearch } from "@/app/serverAction/apiCalls"
import { debounce } from "@/lib/utils"
import { AutoComplete, Avatar } from "antd"

export type searchType = {
    appid: string,
    icon: string,
    logo: string,
    name: string
}

const SearchDropdown = () => {
    const [input, setInput] = useState<string>("");
    const [options, setOptions] = useState<any>([])
    const router = useRouter()

    const searchResults = (results: searchType[]) => {
        let data = results.map(el => {
            return {
                value: el.name,
                label: <div className="flex items-center gap-3" onClick={() => navigateGame(el.appid)}>
                    <Avatar src={el.icon || el.logo} size={"small"} className="size-10" />
                    <p className="text-sm truncate max-w-[80%]">{el.name}</p>
                </div>
            }
        })
        return data

    }
    // getSearch Api 
    useEffect(() => {
        const searchFetch = debounce(async () => {
            const data = await getSearch(input)
            setOptions(searchResults(data))
        }, 400)
        !!input.length && searchFetch()

        return () => searchFetch.cancel()
    }, [input])


    // handleSubmit 
    const navigateSearchPage = () => {
        router.push(`/search/${input}`)
        setInput("");
    }

    // handleClick 
    const navigateGame = (id: string) => {
        router.push(`/game/${id}`);
        setOptions([])
    }

    console.log(options)
    return (
        <AutoComplete
            options={options}
            value={input}
            onChange={(e) => setInput(e)}
            className="w-80 outline-none"
            size="large"
            onKeyDown={e => e.key === 'Enter' && navigateSearchPage()}
            placeholder="Search a Game"
        />
    )
}

export default SearchDropdown
