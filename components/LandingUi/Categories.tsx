"use client";
import React from "react";
import { TCategoryDataProps } from "@/types";
import { GameCard } from "../ui/GameCard";

export const Categories = ({ gameData, heading }: TCategoryDataProps) => {

  return (
    <div className="py-5 sm:py-10 px-4">
      <h1 className="font-bold text-3xl sm:text-4xl py-4">{heading}</h1>
      <div className="h-1 my-1 rounded w-[7%] bg-gradient-to-r from-[#fe1f94] to-[#fd2adf]" />
      <div className={`grid grid-cols-2 gap-4 p-2 ${heading == 'New Releases' ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
        {gameData?.map((item: any) => item.type == 0 && (
          <GameCard item={item} heading={heading} key={item.id} />
        ))}
      </div>
    </div>
  );
};
