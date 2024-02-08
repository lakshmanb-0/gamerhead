import { getAppDetails, getDlc, getNews, getReviews } from "@/app/server.ts/apiCalls";
import { createLastVisited } from "@/app/server.ts/prismaDb";
import GameProfileClient from "@/components/GameProfile/GameProfileClient";
import { TNewsData } from "@/types";
import { auth } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GamePage = async ({ params }: { params: { id: number } }) => {
  const { userId } = auth()

  // game data
  const response = await getAppDetails(Number(params.id))
  const gameData = await response?.[params.id].data;

  // news data
  const newsApi = await getNews(params.id);
  const newsResponse = await newsApi?.appnews?.newsitems?.filter((item: TNewsData) => item.author !== "SteamDB")

  //review data
  const review = await getReviews(params.id);
  const dlcData = await getDlc(gameData?.steam_appid);


  //all dbData files
  const currentUser = await prisma.usersDb.findFirst({
    where: { id: userId! }
  })

  if (!currentUser?.lastVisitedData?.includes(Number(params.id))) {
    await createLastVisited(userId!, Number(params.id));
  }

  return (
    <GameProfileClient gameData={gameData} news={newsResponse} reviews={review} dlcData={dlcData} currentUser={currentUser} />
  );
};

export default GamePage;
