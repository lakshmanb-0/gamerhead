'use client'
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { getAppDetails } from "@/app/server.ts/apiCalls";
import { Skeleton } from "../ui/skeleton";
import ImageBox from "../ImageBox";
import { TSingleGameData } from "@/types";
import { useInView } from 'react-intersection-observer';

type appid = {
  appid: number
}

let hasMore = 0;
export default function LandingInfinite({ data }: { data: { item_ids: appid[] } }) {
  // const [hasMore, setHasMore] = useState(true);
  const [displayData, setDisplayData] = useState<TSingleGameData[]>([])
  const { ref, inView } = useInView({
    threshold: 0,
  });
  console.log(data);


  // const getMorePost = () => {
  //   if (posts?.length == data?.item_ids?.length) { setHasMore(false) }
  //   setPosts((posts: appid[]) => [...posts,]);
  // };

  console.log(hasMore);
  console.log(data?.item_ids?.length);
  console.log(displayData);
  console.log(displayData?.length);

  // useEffect(() => {
  //   const apiDetail = async () => {
  //     if (!!posts.slice(-1)[0]?.appid) {
  //       let appid = posts.slice(-1)
  //       const response = await getAppDetails(`?appids=${appid[0].appid}&cc=IND&l=english`);
  //       setDisplayData((prev: appid[]) => [...prev, response[appid[0].appid].data])
  //     }
  //   }
  //   apiDetail()
  // }, [posts])

  useEffect(() => {
    if (inView && (hasMore < data?.item_ids?.length - 1)) {
      const apiDetail = async () => {
        let appid = data?.item_ids[hasMore].appid
        hasMore++;
        const response = await getAppDetails(appid);
        response[appid]?.data && setDisplayData((prev) => [...prev, response[appid].data])
      }
      apiDetail()
    }
  }, [inView, data])


  return (
    <>
      {displayData?.map((el) => (
        <div className=" ">
          <h1>{el?.name}</h1>
          <ImageBox realImage={el?.background_raw} errorImage={el?.header_image} />
        </div>
      ))}
      <div ref={ref}>
        {hasMore < data?.item_ids?.length - 1 && <Skeleton className="h-12 w-12 rounded-full bg-white" />}
      </div>
      {/* <InfiniteScroll
        dataLength={posts.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {displayData.map((el: TSingleGameData) => (
          <div key={el?.steam_appid} className=" ">
            <h1>{el?.name}</h1>
            <ImageBox realImage={el?.background_raw} errorImage={el?.header_image} />
          </div>
        ))}
      </InfiniteScroll> */}
    </>
  );
}
