"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TGameData, TGameDataProps } from "@/types";

const GamesSale = ({ gameData }: TGameDataProps) => {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/GameProfile/${id}`);
  };

  return (
    <div className="py-10 px-4">
      <h1 className="text-4xl py-4">Games on Sale</h1>
      <div className=" flex overflow-x-scroll scrollBar p-2 ">
        {gameData?.map((item: TGameData) => (
          <div key={item.id} className="pr-3 last:pr-0 flex flex-col">
            <div
              className="w-[19rem] cursor-pointer"
              onClick={() => handleClick(item.id)}
            >
              <Image
                src={item?.large_capsule_image || item?.header_image}
                alt={item.name}
                width={1080}
                height={1920}
                className="h-[10rem]"
              />
            </div>
            <div className="flex flex-col justify-center p-3 h-full">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesSale;
