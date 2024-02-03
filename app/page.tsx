import { Categories } from "@/components/LandingUi/Categories";
import Dlc from "@/components/LandingUi/Dlc";
import GamesSale from "@/components/LandingUi/GamesSale";
import Header from "@/components/LandingUi/Header";
import LandingInfinite from "@/components/LoadingInfinite/LandingInfinite";
import { getAppDetails, getCategory, getDlc, getFeature, getTopReleases } from "./server.ts/apiCalls";
import { getUniqueData } from "@/utils/utility";
import { ToastContainer } from "react-toastify";


export default async function Home() {
  const categoryData = await getCategory();
  const headerData = await getFeature();
  const topReleasesData = await getTopReleases();

  const getMonthData = async (index: number) => {
    return await Promise.all(topReleasesData?.response?.pages[index].item_ids?.map(async (id: { appid: number }) => {
      if (!!id.appid) {
        const response = await getAppDetails(Number(id.appid));
        if (response) {
          let responseData = await response[id?.appid].data
          return responseData
        }
      }
    }))
  }

  let monthsData1 = await getMonthData(0);
  let monthsData2 = await getMonthData(1);
  let monthsData3 = await getMonthData(2);



  return (
    <>
      <Header gameData={getUniqueData(headerData?.featured_win)} />
      <GamesSale gameData={getUniqueData(categoryData?.specials?.items)} />
      <Categories gameData={getUniqueData(categoryData?.top_sellers?.items)} heading="Top Sellers" />
      <Categories gameData={getUniqueData(categoryData?.new_releases?.items)} heading="New Releases" />
      <Categories gameData={getUniqueData(categoryData?.coming_soon?.items)} heading="Upcoming" />
      <LandingInfinite data={monthsData1} />
      <LandingInfinite data={monthsData2} />
      <LandingInfinite data={monthsData3} />
      <ToastContainer />
    </>
  );
}
