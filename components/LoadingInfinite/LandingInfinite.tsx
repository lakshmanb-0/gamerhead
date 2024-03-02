"use client";
import { TSingleGameData } from "@/types";
import TopReleaseCard from "./TopReleaseCard";

export default function LandingInfinite({ data }: { data: TSingleGameData[] }) {

  return (
    <section className="p-4">
      {data?.map((item) => !item?.content_descriptors?.ids?.includes(4) && (
        <TopReleaseCard item={item} key={item.steam_appid} />
      ))}
    </section>
  );
}
