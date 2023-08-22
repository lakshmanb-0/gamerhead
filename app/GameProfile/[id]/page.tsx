import { GetNews, GetReviews, apiDetails } from "@/axios";
import GameProfileClient from "@/components/GameProfileClient";

const GamePage = async ({ params }: { params: { id: string } }) => {
  // game data
  const response = await apiDetails.get(
    `?appids=${params.id}&cc=IND&l=english`
  );
  const gameData = response.data[params.id].data;

  // news data
  const newsApi = await GetNews.get(`&appid=${params.id}`);
  const newsResponse = newsApi.data.appnews.newsitems;

  let news = [];
  newsResponse.map((item) => {
    item.contents[0] !== "[" && item.author !== "SteamDB"
      ? news.push(item)
      : "";
  });

  //review data
  const review = await GetReviews.get(`${params.id}?json=1&cc=IND&l=english`);
  const reviews = review.data;

  return (
    <main>
      <GameProfileClient gameData={gameData} news={news} reviews={reviews} />
    </main>
  );
};

export default GamePage;
