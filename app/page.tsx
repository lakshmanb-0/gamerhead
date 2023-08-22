import { Categories } from "@/components/Categories";
import Dlc from "@/components/Dlc";
import GamesSale from "@/components/GamesSale";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { apiDetails, featured, featuredCategories } from "@/axios";
import { AxiosResponse } from "axios";
import {
  TApiDetailsApi,
  TCategoryApiType,
  TGameData,
  THeaderApiType,
  TSingleGameData,
} from "@/types";

export default async function Home() {
  // unique game data function
  const getUniqueData = (objects) => {
    const uniqueMap = new Map();
    objects.forEach((obj) => {
      uniqueMap.set(obj.id, obj);
    });
    return Array.from(uniqueMap.values());
  };

  //dlc
  const gameDlc: number[] = [
    1945360, 1945340, 2266420, 1940230, 1656370, 1656330, 1314563, 1090200,
    1090150, 1745440,
  ];

  let dlcData = [];
  gameDlc.map(async (item: number) => {
    const response: AxiosResponse<TApiDetailsApi> = await apiDetails.get(
      `?appids=${item}&cc=IND&l=english`
    );
    const data = response.data[item].data;
    dlcData.push(data);
  });

  //header
  const headerApi: AxiosResponse<THeaderApiType> =
    await featured.get<THeaderApiType>("");
  const headerData = getUniqueData(headerApi.data.featured_win);

  //gameSale
  const CategoryApi: AxiosResponse<TCategoryApiType> =
    await featuredCategories.get<TCategoryApiType>("");
  const gameSaleData = getUniqueData(CategoryApi.data.specials.items);

  // //topSellers
  const topSellers = getUniqueData(CategoryApi.data.top_sellers.items);
  // //Upcoming
  const upcoming = getUniqueData(CategoryApi.data.coming_soon.items);
  // // new releases
  const newReleases = getUniqueData(CategoryApi.data.new_releases.items);

  return (
    <main>
      {/* <Navbar /> */}
      <Header gameData={headerData} />
      <GamesSale gameData={gameSaleData} />
      <Categories gameData={topSellers} heading="Top Sellers" />
      <Categories gameData={upcoming} heading="Upcoming" />
      <Categories gameData={newReleases} heading="New Releases" />
      <Dlc gameData={dlcData} />
    </main>
  );
}
