"use client";
import React from "react";
import { TGameData } from "@/types";
import { GameCard } from "../ui/GameCard";

const GamesSale = ({ gameData }: { gameData: TGameData[] }) => {
  return (
    <div className="py-10 px-4">
      <h1 className="font-bold text-4xl py-4">Games on Sale</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2 gap-6 ">
        {gameData?.map((item: TGameData) => (
          <GameCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default GamesSale;
