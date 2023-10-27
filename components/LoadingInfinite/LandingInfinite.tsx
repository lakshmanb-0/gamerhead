'use client'
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

type appid = {
  appid: number
}
export type InfiniteData = {
  data: { item_ids: appid[] }
};
export default function LandingInfinite({ data }: InfiniteData) {
  console.log(data);

  const [posts, setPosts] = useState<appid[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const getMorePost = () => {
    if (posts?.length == data?.item_ids?.length) { setHasMore(false) }
    setPosts((posts: appid[]) => [...posts, data?.item_ids?.[posts.length]]);
  };
  console.log(data);

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {posts.map((el: appid) => (
          <div key={el?.appid}>
            {el?.appid}
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}
