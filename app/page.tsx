import { Categories } from "@/components/LandingUi/Categories";
import Dlc from "@/components/LandingUi/Dlc";
import GamesSale from "@/components/LandingUi/GamesSale";
import Header from "@/components/LandingUi/Header";
import Providers from "@/components/Provider/Providers";
import LandingInfinite from "@/components/LoadingInfinite/LandingInfinite";
import { useEffect, useState } from "react";
import { TCategoryApiType, TDlcProps, THeaderApiType } from "@/types";
import { getCategory, getDlc, getFeature, getTopReleases } from "./server.ts/apiCalls";
import { SignedIn, auth, currentUser, useAuth } from "@clerk/nextjs";
import Navbar from "@/components/LandingUi/Navbar";

export default async function Home() {
  const categoryData = await getCategory();
  const headerData = await getFeature();
  const topReleasesData = await getTopReleases();
  const dlcData = await getDlc();
  // fetch(`/api/dlc?appid=${1085660}`).then((res) => res.json()).then((data) => setDlcData(data.data))

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
      <Navbar />
      {/* <Header gameData={getUniqueData(headerData?.featured_win)} />
      <GamesSale gameData={getUniqueData(categoryData?.specials?.items)} />
      <Categories gameData={getUniqueData(categoryData?.top_sellers?.items)} heading="Top Sellers" />
      <Categories gameData={getUniqueData(categoryData?.coming_soon?.items)} heading="Upcoming" />
      <Categories gameData={getUniqueData(categoryData?.new_releases?.items)} heading="New Releases" />
      <Dlc dlc={getUniqueData(dlcData?.dlc)} />
      <LandingInfinite data={topReleasesData?.response?.pages[0]} /> */}
    </>
  );
}
