import { GetNews, GetReviews, apiDetails } from "@/axios";
import GameProfileClient from "@/components/GameProfileClient";
import { TNewsData } from "@/types";

const GamePage = async ({ params }: { params: { id: string } }) => {
  // game data
  const response = await apiDetails.get(`?appids=${params.id}&cc=IND&l=english`);
  const gameData = response.data[params.id].data;
  console.log(gameData);

  // news data
  const newsApi = await GetNews.get(`&appid=${params.id}`);
  const newsResponse = newsApi.data.appnews.newsitems;

  //review data
  const review = await GetReviews.get(`${params.id}?json=1&cc=IND&l=english`);
  const reviews = review.data;

  return (
    <main>
      <GameProfileClient gameData={gameData} news={newsResponse.filter((item: TNewsData) => item.author !== "SteamDB")} reviews={reviews} />
    </main>
  );
};

export default GamePage;
