'use client'
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { getAppDetails } from "@/app/server.ts/apiCalls";
import { Skeleton } from "../ui/skeleton";
import ImageBox from "../ImageBox";
import { TSingleGameData } from "@/types";

type appid = {
  appid: number
}
export type InfiniteData = {
  data: { item_ids: appid[] }
};

export default function LandingInfinite({ data }: InfiniteData) {

  const [posts, setPosts] = useState<appid[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [displayData, setDisplayData] = useState<any>([])


  const getMorePost = () => {
    if (posts?.length == data?.item_ids?.length) { setHasMore(false) }
    setPosts((posts: appid[]) => [...posts, data?.item_ids?.[posts.length]]);

  };

  useEffect(() => {
    const apiDetail = async () => {
      if (!!posts.slice(-1)[0]?.appid) {
        let appid = posts.slice(-1)
        const response = await getAppDetails(`?appids=${appid[0].appid}&cc=IND&l=english`);
        setDisplayData((prev: appid[]) => [...prev, response[appid[0].appid].data])
      }
    }
    apiDetail()
  }, [posts])

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={<Skeleton className="h-12 w-12 rounded-full bg-white" />}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {displayData.map((el: TSingleGameData) => (
          <div key={el?.steam_appid} className=" ">
            <h1>{el?.name}</h1>
            <ImageBox realImage={el?.background_raw} errorImage={el?.header_image} />
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}
