"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { TDlcDataProps, TDlcProps } from "@/types";
import ImageBox from "../ImageBox";

const Dlc = ({ dlc }: TDlcProps) => {
  const router = useRouter();
  console.log(dlc);

  const handleClick = (id: number) => {
    router.push(`/GameProfile/${id}`);
  };

  return (
    <div className="py-10 px-4">
      <h1 className="text-4xl font-bold">Destiny DLC</h1>
      <div className="flex overflow-x-scroll scrollBar p-2">
        {dlc?.map((item: TDlcDataProps, index: number) => (
          <div key={index} className="pr-3 last:pr-0 flex flex-col gap-2 py-5">
            <div
              className="w-[300px] cursor-pointer"
              onClick={() => handleClick(item.id)}
            >
              <ImageBox realImage={item?.header_image} errorImage={item?.header_image} customStyle={'h-[12rem]'} />
              {/* <Image
                src={item.background_raw}
                alt={item.name}
                width={1080}
                height={1920}
                className="h-[12rem]"
              /> */}
            </div>
            <div className="flex flex-col gap-1 h-full">
              <h1 className="text-xl py-2 text-center">{item.name}</h1>
              <div className="text-center mt-auto ">
                {item.price_overview ? (
                  item.price_overview.discount_percent !== 0 ? (
                    <>
                      <span>{item.price_overview.discount_percent}% </span>
                      <span>{item.price_overview.initial} </span>
                      <span>{item.price_overview.final}</span>
                    </>
                  ) : (
                    <span className="text-lg bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] px-4 py-2 ">
                      &#8377;{item.price_overview.initial}
                    </span>
                  )
                ) : (
                  <span className="text-lg bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] px-4 py-2 ">
                    Free to Play
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dlc;
