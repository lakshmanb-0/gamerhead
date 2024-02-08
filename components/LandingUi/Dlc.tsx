"use client";
import React from "react";
import { TDlcData } from "@/types";
import { GameCard } from "../ui/GameCard";
const Dlc = ({ dlcData }: { dlcData: TDlcData }) => {

  return !!dlcData?.dlc?.length && (
    <div className="py-5 sm:py-8 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold"> {dlcData?.name} DLC: </h1>
      <div className="overflow-auto flex gap-3 py-4 scrollBar">
        {dlcData?.dlc?.map((item) => (
          <GameCard item={item} key={item.id} dlc={true} />
        ))}
      </div>
    </div>
  );
};

export default Dlc;
