'use server'
import { getSearch } from '@/app/serverAction/apiCalls';
import { Search } from '@/components/index';
import React from 'react'

const page = async ({ params }: { params: { input: string } }) => {
  const response = await getSearch(params.input);

  return (
    <Search searchData={response} searchInput={params.input} />
  )
}

export default page 