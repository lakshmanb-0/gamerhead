"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { TCategoryDataProps, TGameData } from "@/types";
import ImageBox from "../ImageBox";

export const Categories = ({ gameData, heading }: TCategoryDataProps) => {
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/GameProfile/${id}`);
  };

  return (
    <div className="py-10 px-4">
      <h1 className="font-bold text-4xl">{heading}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
        {gameData?.map((item: TGameData) => item.type == 0 && (
          <div
            key={item.id}
            className={`flex items-center gap-4 py-3  ${heading === "Upcoming" ? "" : "flex-col"}`}
          >
            <div
              className="w-full h-full cursor-pointer"
              onClick={() => handleClick(item.id)}
            >
              <ImageBox realImage={item?.large_capsule_image} errorImage={item?.header_image} />
            </div>
            <div className="text-center">
              <div className="py-2 flex items-center justify-center gap-4 px-4">
                {item?.discounted ? (
                  <>
                    <span className="border-2 border-[#7360ed] py-1 px-3">
                      {item.discount_percent}%{" "}
                    </span>
                    <span className="line-through text-[#a3a3a3] text-lg">
                      &#8377;{item.original_price}{" "}
                    </span>
                    <span className="text-lg bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] px-4 py-2 ">
                      &#8377;{item.final_price}
                    </span>
                  </>
                ) : (
                  <span className="text-lg bg-gradient-to-r from-[#fe1f94] to-[#fd2adf] px-4 py-2 ">
                    {item.original_price
                      ? `₹${item.original_price}`
                      : heading == "Upcoming"
                        ? "Coming Soon"
                        : "Free to Play"}
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
