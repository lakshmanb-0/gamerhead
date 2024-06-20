import React from 'react'
import { NewsItem } from '../../index'
import { TNewsData } from '@/types'

const News = ({ news }: { news: TNewsData[] }) => {
  return !!news.length && (
    <section className="py-5 sm:py-10 maxWidth ">
      <div className="py-4">
        <h1 className="font-bold text-4xl">News :</h1>
        <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
      </div>
      <div className="flex flex-col gap-10">
        {news?.map((item) => item.author !== 'SteamDB' && (
          <NewsItem key={item.gid} item={item} />
        ))}
      </div>
    </section>
  )
}

export default News