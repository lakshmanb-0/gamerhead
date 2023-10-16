import { Categories } from "@/components/Categories";
import Dlc from "@/components/Dlc";
import GamesSale from "@/components/GamesSale";
import Header from "@/components/Header";
import Providers from "@/components/Provider/Providers";
import LandingInfinite from "@/app/LandingInfinite";
import { useEffect, useState } from "react";
import { TCategoryApiType, TDlcProps, THeaderApiType } from "@/types";
import { getCategory, getFeature, getTopReleases } from "./server.ts/apiCalls";

export default async function Home() {
  const categoryData = await getCategory();
  const headerData = await getFeature();
  const topReleasesData = await getTopReleases();
  // fetch(`/api/dlc?appid=${1085660}`).then((res) => res.json()).then((data) => setDlcData(data.data))
  // fetch(`/api/header`).then((res) => res.json()).then((data) => setHeaderData(data.data))
  // fetch(`/api/topRelease`).then((res) => res.json()).then((data) => setTopReleasesData(data.data.response.pages))
  // }, [])

  // uniqueArray 
  const getUniqueData = (objects: any) => {
    const uniqueMap = new Map();
    objects?.forEach((obj: any) => {
      uniqueMap.set(obj.id, obj);
    });
    return Array.from(uniqueMap.values());
  };

  return (
    <>
      <Providers />
      {/* <Navbar /> */}

      <Header gameData={getUniqueData(headerData?.featured_win)} />
      <GamesSale gameData={getUniqueData(categoryData?.specials?.items)} />
      <Categories gameData={getUniqueData(categoryData?.top_sellers?.items)} heading="Top Sellers" />
      <Categories gameData={getUniqueData(categoryData?.coming_soon?.items)} heading="Upcoming" />
      <Categories gameData={getUniqueData(categoryData?.new_releases?.items)} heading="New Releases" />
      {/* <Dlc dlc={getUniqueData(dlcData?.dlc)} /> */}
      <div>hello</div>
      <LandingInfinite data={topReleasesData?.response?.pages[0]} />
    </>
  );
}
