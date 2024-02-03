"use client";
import React from "react";
import { TDlcData } from "@/types";
import { GameCard } from "../ui/GameCard";

const Dlc = ({ dlcData }: { dlcData: TDlcData }) => {

  return !!dlcData?.dlc?.length && (
    <div className="py-10 px-4">
      <h1 className="text-4xl font-bold"> {dlcData?.name} DLC</h1>
      <div className="overflow-auto flex gap-3 py-3">
        {dlcData?.dlc?.map((item) => (
          <div className="aspect-video min-w-[300px] h-full" key={item.id}>
            <GameCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dlc;
