import React from "react";
import { TDlcData } from "@/types";
import { GameCard } from "../index";

const Dlc = ({ dlcData }: { dlcData: TDlcData }) => {
  return !!dlcData?.dlc?.length && (
    <div className="py-5 sm:py-8 px-4 maxWidth">
      <h1 className="text-3xl sm:text-4xl font-bold"> {dlcData?.name} DLC: </h1>
      <div className="overflow-auto flex gap-3 py-4 ">
        {dlcData?.dlc?.map((item) => (
          <GameCard item={item} key={item.id} dlc={true} />
        ))}
      </div>
    </div>
  );
};

export default Dlc;
