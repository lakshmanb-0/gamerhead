"use client";
import React from "react";
import { TCategoryDataProps, TGameData } from "@/types";
import { GameCard, TGameCard } from "../ui/GameCard";

export const Categories = ({ gameData, heading }: TCategoryDataProps) => {
  console.log(gameData);

  return (
    <div className="py-10 px-4">
      <h1 className="font-bold text-4xl py-4">{heading}</h1>
      <div className={`grid grid-cols-2 gap-4 p-2 ${heading == 'New Releases' ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
        {gameData?.map((item: any) => item.type == 0 && (
          <GameCard item={item} heading={heading} key={item.id} />
        ))}
      </div>
    </div>
  );
};
