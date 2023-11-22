"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TGameData, TGameDataProps } from "@/types";
import ImageBox from "../ImageBox";
import CountdownTimer from "../countdownTimer";

const GamesSale = ({ gameData }: TGameDataProps) => {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState('')

  const handleClick = (id: number) => {
    router.push(`/GameProfile/${id}`);
  };

  useEffect(() => {
    fetch(`/api/category`).then((res) => res.json())
      .then((data) => {
        console.log(data);

      })
  }, []);
  console.log(gameData);

  return (
    <div className="py-10 px-4">
      <h1 className="text-4xl py-4">Games on Sale</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-6 ">
        {gameData?.map((item: TGameData) => (
          <div key={item.id} className="flex flex-col hover:scale-105 transition ease-in-out duration-500">
            <div
              className=" cursor-pointer h-full"
              onClick={() => handleClick(item.id)}
            >
              <ImageBox realImage={item?.header_image} errorImage={item?.large_capsule_image} customStyle={'rounded-lg'} />
              {/* <Image
                src={imgSrc ? item?.header_image : item?.large_capsule_image}
                alt={item.name}
                // onLoad={()=> setImgSrc(item?.large_capsule_image)}
                onError={() => setImgSrc(item?.header_image)}
                width={1080}
                height={1920}
                className="rounded-lg"
              /> */}
            </div>
            {/* <div className="flex flex-col justify-center p-3 h-full">
              <h1 className="text-xl py-2 text-center font-bold">
                {item.name}
              </h1>
              <div className="flex items-center justify-between mt-auto ">
                {item?.discount_percent && (
                  <span className="border-2 border-[#7360ed] py-1 px-3">
                    {item.discount_percent}%
                  </span>
                )}
                <span className="line-through text-[#a3a3a3] text-lg">
                  &#8377;{item?.original_price}
                </span>
                <span className="text-lg bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] px-4 py-2 ">
                  &#8377;{item?.final_price}
                </span>
              </div>
            </div> */}
            <div>hello</div>
            {item?.discounted && <div>
              <h1>{CountdownTimer(item?.discount_expiration).days} days </h1>
              <h1>{CountdownTimer(item?.discount_expiration).hours} hours </h1>
              <h1>{CountdownTimer(item?.discount_expiration).minutes} minutes </h1>
              <h1>{CountdownTimer(item?.discount_expiration).seconds} seconds </h1>
            </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesSale;
