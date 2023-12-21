import { Categories } from "@/components/LandingUi/Categories";
import Dlc from "@/components/LandingUi/Dlc";
import GamesSale from "@/components/LandingUi/GamesSale";
import Header from "@/components/LandingUi/Header";
import LandingInfinite from "@/components/LoadingInfinite/LandingInfinite";
import { getCategory, getDlc, getFeature, getTopReleases } from "./server.ts/apiCalls";
import { getUniqueData } from "@/utils/utility";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";


// export const metadata: Metadata = {
//   title: "GamerHead",
//   description:
//     `Welcome to GameStore, your ultimate destination for all things gaming! Step into a world of endless fun and adventure as we bring you the best selection of video games, 
//     consoles, and gaming accessories. Our website is designed to cater to gamers of all ages and preferences, providing an immersive and user-friendly experience.`,
// };

export default async function Home() {
  const categoryData = await getCategory();
  const headerData = await getFeature();
  const topReleasesData = await getTopReleases();
  const dlcData = await getDlc(1085660);



  return (
    <>
      {/* <Header gameData={getUniqueData(headerData?.featured_win)} />
      <GamesSale gameData={getUniqueData(categoryData?.specials?.items)} />
      <Categories gameData={getUniqueData(categoryData?.top_sellers?.items)} heading="Top Sellers" />
      <Categories gameData={getUniqueData(categoryData?.coming_soon?.items)} heading="Upcoming" />
      <Dlc dlcData={dlcData} />
      <LandingInfinite data={topReleasesData?.response?.pages[0]} />
      <Categories gameData={getUniqueData(categoryData?.new_releases?.items)} heading="New Releases" /> */}
      <ToastContainer />
    </>
  );
}
