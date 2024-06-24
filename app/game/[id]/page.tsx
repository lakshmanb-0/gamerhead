import { getAppDetails, getDlc, getReviews } from "@/app/serverAction/apiCalls";
import { AboutGame, Dlc, HeaderGame, MatureContent, Movies, Reviews } from "@/components/index";

const page = async ({ params }: { params: { id: number } }) => {

  const response = getAppDetails(params.id)
  const review = getReviews(params.id);

  const [gameData, reviewData] = await Promise.all([response, review])
  const dlcData = await getDlc(gameData?.steam_appid);

  if (!gameData) {
    return (
      <section className="grid place-items-center h-screen text-xl sm:text-3xl text-center">
        <div className="flex flex-col gap-8 px-4">
          <span className="font-bold text-5xl sm:text-8xl">Sorry for the inconvenience.</span>
          <span>It looks like the Steam third-party API has crashed. Please try again later.</span>
        </div>
      </section>
    )
  }

  return (
    <main>
      <HeaderGame gameData={gameData} reviews={reviewData} />
      {gameData?.movies?.length && <Movies movies={gameData?.movies} type='trailers' />}
      {gameData?.screenshots?.length && <Movies screenshots={gameData?.screenshots} type='screenshots' />}
      <AboutGame gameData={gameData} />
      <Dlc dlcData={dlcData} />
      <Reviews reviews={reviewData.reviews} steamId={params.id} />
      {
        gameData?.content_descriptors?.ids?.includes(4) &&
        <MatureContent notes={gameData?.content_descriptors?.notes ?? ''} />
      }

    </main>
  );
};

export default page;
