"use client";
import React from "react";
import { TGameData } from "@/types";
import { GameCard } from "../ui/GameCard";

const GamesSale = ({ gameData }: { gameData: TGameData[] }) => {
  return (
    <div className="py-5 sm:py-10 px-4">
      <h1 className="font-bold text-3xl sm:text-4xl py-4">Games on Sale</h1>
      <div className="h-1 my-1 rounded w-[7%] bg-gradient-to-r from-[#fe1f94] to-[#fd2adf]" />
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-6 ">
        {gameData?.map((item: any) => (
          <GameCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default GamesSale;
