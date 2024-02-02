"use client";
import { useState } from "react";
import { TSingleGameData } from "@/types";
import TopReleaseCard from "./TopReleaseCard";

// let hasMore = 1;
export default function LandingInfinite({ data }: { data: TSingleGameData[] }) {
  const [displayData, setDisplayData] = useState(data);

  return (
    <>
      {displayData?.map((item) => (
        <TopReleaseCard item={item} key={item.steam_appid} />
      ))}
    </>
  );
}
