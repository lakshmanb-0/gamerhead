"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { TGameData, TGameDataProps } from "@/types";
import ImageBox from "../ImageBox";
import CountdownTimer from "../countdownTimer";
import { AiFillWindows } from "react-icons/ai";
import { RiMacLine } from "react-icons/ri";
import { DiLinux } from "react-icons/di";

const Header = ({ gameData }: TGameDataProps) => {
  const router = useRouter();

  //handle click button
  const handleClick = (id: number) => {
    router.push(`/GameProfile/${id}`);
  };

  console.log(CountdownTimer(1699549254));
  return (
    <section className="flex overflow-x-scroll scrollbar w-full gap-4">
      {/* games list  */}
      {gameData?.map((item: TGameData, index: number) => (
        <div
          key={index}
          onClick={() => handleClick(item.id)}
          className="cursor-pointer py-4 h-auto"
        >
          {/* <div className="w-[100vw]"> */}
          <ImageBox realImage={item?.large_capsule_image} errorImage={item?.small_capsule_image} customStyle="aspect-video w-[100vw]" />
          {/* </div> */}
          <div>
            <h1>{item?.name}</h1>
            <div className="text-sm py-2 flex items-center gap-4">
              <span className="opacity-60 ">Platform:</span>{" "}
              <div className="flex gap-1 text-xl">
                {item?.windows_available && <AiFillWindows />}
                {item?.mac_available && <RiMacLine />}
                {item?.linux_available && <DiLinux />}
              </div>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
};

export default Header;
