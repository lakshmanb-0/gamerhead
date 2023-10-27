"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { TGameData, TGameDataProps } from "@/types";
import ImageBox from "../ImageBox";

const Header = ({ gameData }: TGameDataProps) => {
  const router = useRouter();

  //handle click button
  const handleClick = (id: number) => {
    router.push(`/GameProfile/${id}`);
  };

  return (
    <section className="flex overflow-x-scroll scrollbar w-full gap-4">
      {/* games list  */}
      {gameData?.map((item: TGameData, index: number) => (
        <div
          key={index}
          onClick={() => handleClick(item.id)}
          className="cursor-pointer py-4 h-auto"
        >
          <div className="w-[60rem]">
            <ImageBox realImage={item?.large_capsule_image} errorImage={item?.small_capsule_image} />
            {/* <Image
                src={item?.large_capsule_image || item?.small_capsule_image}
                width={1080}
                height={1920}
                alt={item?.name}
                className="h-[24rem]"
              /> */}
          </div>
        </div>

      ))}
    </section>
  );
};

export default Header;
