"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { getAppDetails, getidsData } from "@/app/server.ts/apiCalls";
import { Skeleton } from "../ui/skeleton";
import ImageBox from "../ImageBox";
import { TSingleGameData } from "@/types";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import ModalVideo from "../ui/ModalVideo";
import Image from "next/image";
import { PlayCircleIcon } from "lucide-react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { AiFillWindows } from "react-icons/ai";
import { RiMacLine } from "react-icons/ri";
import { DiLinux } from "react-icons/di";

type appid = {
  appid: number;
};

// let hasMore = 1;
export default function LandingInfinite({ data }) {
  const [type, setType] = useState(0);
  const [typeData, setTypeData] = useState();
  const [displayData, setDisplayData] = useState<TSingleGameData[]>(data);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // const getMorePost = () => {
  //   if (posts?.length == data?.item_ids?.length) { setHasMore(false) }
  //   setPosts((posts: appid[]) => [...posts,]);
  // };

  // console.log(hasMore);
  // console.log(data?.item_ids?.length);
  // console.log(displayData);
  // console.log(displayData?.length);

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

  // useEffect(() => {
  //   if (inView && (hasMore < data?.item_ids?.length - 1)) {
  //     const apiDetail = async () => {
  //       let appid = data?.item_ids[hasMore].appid
  //       hasMore++;
  //       const response = await getAppDetails(appid);
  //       response[appid]?.data && setDisplayData((prev) => [...prev, response[appid].data])
  //     }
  //     apiDetail()
  //   }
  // }, [inView, data])
  console.log(type);
  console.log(typeData);

  const handlePrice = (item) => {
    if (item.final_price == 0) return 'Free'
    else return '₹' + Number(item?.final_price) / 100 ?? Number(item?.original_price) / 100
  }
  return (
    <>
      {displayData?.map((item) => (
        <Card
          shadow="sm"
          key={item.steam_appid}
          className="max-w-[900px] mx-auto my-10"
        >
          <CardHeader className="flex justify-between items-center">
            <h1 className="px-3 text-xl font-bold">{item.name}</h1>
            <div>
              <div className="flex gap-2 items-center">
                {!!item?.price_overview?.discount_percent ? (
                  <>
                    <span className="text-xl">
                      {item?.price_overview?.final_formatted}
                    </span>
                    <span className="line-through opacity-60 text-xl">
                      {item?.price_overview?.initial_formatted}{" "}
                    </span>
                  </>
                ) : (
                  <span className="text-xl">
                    {item?.price_overview?.final_formatted
                      ?? (item?.release_date?.coming_soon
                        ? "Coming soon"
                        : "Free to Play")}
                  </span>
                )}
              </div>
            </div>

          </CardHeader>
          <CardBody className="grid grid-cols-3 gap-4">
            <section className="col-span-2 flex flex-col gap-4">
              {type == 0 ?
                <div>
                  <Plyr
                    source={{
                      type: "video",
                      sources: [
                        { src: typeData }
                      ]
                    }}
                  />
                </div>
                : <ImageBox realImage={typeData} />
              }
              <section className="overflow-x-scroll flex gap-3 py-3">
                {item?.movies?.map((item) => (
                  <div className="w-full aspect-video relative" onClick={() => { setType(0); setTypeData(item.mp4?.max) }}>
                    <Image key={item?.id} src={item?.thumbnail} width={1080} height={1920} alt='hello' className="w-[150px] object-cover aspect-video" />
                    <PlayCircleIcon className="absolute top-0 left-0 w-full h-full p-5" />
                  </div>
                ))}
                {item?.screenshots?.map((item: { id: number, path_full: string }) => (
                  <Image key={item?.id} src={item?.path_thumbnail} width={1080} height={1920} alt='hello' className="w-[150px] object-cover aspect-video" onClick={() => { setType(1); setTypeData(item.path_full) }} />
                ))}
              </section>
            </section>


            <section>
              <div className="relative">
                <ImageBox realImage={item?.header_image} />
                {!!item?.price_overview?.discount_percent && <div className="absolute top-0 right-0 px-4 py-1 text-lg  z-10 text-green_color bg-[#212224]">
                  {item?.price_overview?.discount_percent}%
                </div>}
              </div>
              <p className="py-3 opacity-60">{item.short_description}</p>
              <section className="py-3 flex flex-col gap-1">
                <div className="grid grid-cols-2">
                  <h1>Release Date:</h1>
                  <p className="opacity-60">{item.release_date?.date}</p>
                </div>
                <div className="grid grid-cols-2">
                  <h1>Developer:</h1>
                  <p className="opacity-60">{item.developers}</p>
                </div>
                <div className="grid grid-cols-2">
                  <h1>Total Reviews:</h1>
                  <p className="opacity-60">{item?.recommendations?.total?.toLocaleString('en')}</p>
                </div>
                <div className="grid grid-cols-2">
                  <h1 >Platform:</h1>
                  <div className="flex items-center gap-2">
                    {item?.platforms?.windows && <AiFillWindows />}
                    {item?.platforms?.mac && <RiMacLine />}
                    {item?.platforms?.linux && <DiLinux />}
                  </div>
                </div>
              </section>
            </section>
          </CardBody>
        </Card>
        // <section className="flex " ref={ref}>
        //   <h1>{el?.name}</h1>
        // </section>
      ))}
      {/* <div ref={ref}>
        {hasMore < data?.item_ids?.length - 1 && <Skeleton className="h-12 w-12 rounded-full bg-white" />}
      </div> */}
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
