import { getAppDetails, getDlc, getNews, getReviews } from "@/app/server.ts/apiCalls";
import GameProfileClient from "@/components/GameProfile/GameProfileClient";
import { TNewsData } from "@/types";

const GamePage = async ({ params }: { params: { id: string } }) => {
  // game data
  const response = await getAppDetails(`?appids=${params.id}&cc=IND&l=english`)
  const gameData = response?.[params.id].data;

  // news data
  const newsApi = await getNews(`appid=${params.id}`);
  const newsResponse = newsApi?.appnews?.newsitems?.filter((item: TNewsData) => item.author !== "SteamDB")

  //review data
  const review = await getReviews(`${params.id}?json=1&cc=IND&l=english`);
  const reviews = review;

  const dlcData = await getDlc(`?appid=${gameData?.steam_appid}`);

  return (
    <GameProfileClient gameData={gameData} news={newsResponse} reviews={reviews} dlcData={dlcData?.dlc} />
  );
};

export default GamePage;
