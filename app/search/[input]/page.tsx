'use server'
import { getAppDetails, getSearch } from '@/app/server.ts/apiCalls';
import { SearchDropdown } from '@/components/ui/SearchDropdown';
import React from 'react'
import Search from './Search';
import { TSingleGameData } from '@/types';

const page = async ({ params }: { params: { input: string } }) => {
  const response = await getSearch(params.input);

  let searchData: TSingleGameData[] = []

  await Promise.all(response.map(async (el: SearchDropdown) => {
    const singleIdData = await getAppDetails(Number(el.appid))
    searchData.push(singleIdData[el.appid].data)
  }))

  return (
    <Search searchData={searchData} searchInput={params.input} />
  )
}

export default page 