import { getAppDetails, getDlc, getNews, getReviews } from "@/app/server.ts/apiCalls";
import { createLastVisited, currentUser } from "@/app/server.ts/prismaDb";
import GameProfileClient from "@/components/GameProfile/GameProfileClient";
import { TNewsData } from "@/types";
import { auth } from "@clerk/nextjs";


const GamePage = async ({ params }: { params: { id: number } }) => {
  const { userId } = auth()

  // game info data
  const response = await getAppDetails(Number(params.id))
  const gameData = await response?.[params.id].data;

  // news data
  const newsApi = await getNews(params.id);
  const newsResponse = await newsApi?.appnews?.newsitems?.filter((item: TNewsData) => item.author !== "SteamDB")

  //review data
  const review = await getReviews(params.id);
  const dlcData = await getDlc(gameData?.steam_appid);

  let current;
  //add game id in lastVisited data into database of user
  if (userId) {
    current = await currentUser(userId)
    if (!current?.lastVisitedData?.includes(Number(params.id))) {
      await createLastVisited(userId!, Number(params.id));
    }
  }

  return (
    <GameProfileClient gameData={gameData} news={newsResponse} reviews={review} dlcData={dlcData} />
  );
};

export default GamePage;
