"use client";
import React from "react";
import parse from "html-react-parser";
import Reviews from "./Reviews";
import News from "./News";
import { BsHandThumbsUp } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { AiFillWindows } from "react-icons/ai";
import { RiMacLine } from "react-icons/ri";
import { DiLinux } from "react-icons/di";
import ImageBox from "../ImageBox";
import { TNewsData, TReviewData } from "@/types";
import ModalVideo from "../ui/ModalVideo";
import Dlc from "../LandingUi/Dlc";


const GameProfileClient = ({ gameData, news, reviews, dlcData }: any) => {
  // get percentage of positive reviews
  const handleReviewPositive = (total: string, positive: string) => {
    const percentage = (parseInt(positive) / parseInt(total)) * 100;
    return Math.floor(percentage);
  };

  return (
    <main>
      <header className="h-screen relative text-white">
        <ImageBox realImage={gameData?.background_raw} errorImage={gameData?.screenshots[0].path_full} customStyle={'absolute top-0 left-0 z-0'} />
        <div className="bg-gradient-to-t from-[rgba(0,0,0,0.50)] z-10 absolute top-0 left-0 h-screen w-full" />
        <section className="absolute bottom-0 left-0 z-20 w-full h-full grid gap-4 sm:grid-cols-2 px-4 sm:px-20 py-10">
          <div className="sm:mt-auto">
            <div className="flex gap-4">
              <span className="flex gap-2 items-center">
                <MdDateRange className="text-xl" />
                {gameData?.release_date?.date}
              </span>
              <div
                className="flex gap-2 items-center"
                title={`${handleReviewPositive(reviews?.query_summary?.total_reviews, reviews?.query_summary?.total_positive)}% of the ${reviews?.query_summary?.total_reviews?.toLocaleString("en-IN")} user reviews for this game are positive`}
              >
                <BsHandThumbsUp className="text-xl" />
                {reviews && reviews.query_summary?.review_score_desc}
                <span className="text-sm">
                  {`(${reviews && reviews.query_summary.total_reviews.toLocaleString("en-IN")})`}
                </span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold py-4">
              {gameData?.name}
            </h1>
            <div className="text-sm py-1">
              <span className="opacity-60">Features: </span>
              <span>
                {gameData?.categories?.map((item: any, index: number) =>
                  index < 3 && `${item?.description}, `
                )}
              </span>
            </div>
            <div className="text-sm py-2 flex items-center gap-4">
              <span className="opacity-60 ">Platform:</span>{" "}
              <div className="flex gap-1 text-xl">
                {gameData?.platforms?.windows && <AiFillWindows />}
                {gameData?.platforms?.mac && <RiMacLine />}
                {gameData?.platforms?.linux && <DiLinux />}
              </div>
            </div>
            <div className="w-12 py-1">
              <ImageBox realImage={gameData?.required_age == 0 ? "/rating/12.png" : "/rating/18.png"} errorImage={'/rating/12.png'} />
            </div>
            <div className="py-1">
              Developer: <span>{gameData?.developers}</span>
            </div>
            <div>
              Publishers: <span>{gameData?.publishers}</span>
            </div>
          </div>

          {/* image left side  */}
          <div className="sm:w-[60%] mx-auto backdrop-blur-lg bg-[rgba(255,255,255,0.4)] rounded-xl h-fit my-auto ">
            <div>
              <ImageBox realImage={gameData?.header_image} errorImage={gameData?.background_raw} customStyle={'rounded-xl'} />
            </div>
            <div className="px-5 py-8">
              <h1 className="text-[1rem] ">{gameData?.short_description}</h1>
              <div className="py-3 flex gap-3">
                {gameData?.genres?.map((item: { id: number, description: string }, index: number) =>
                  index < 3 && (
                    <button
                      key={item.id}
                      className="bg-white text-black px-4 py-1 rounded font-semibold">
                      {item.description}
                    </button>
                  )
                )}
              </div>
              <div className="flex gap-2 items-center">
                {!!gameData?.price_overview?.discount_percent ? (
                  <>
                    <span className="rounded bg-blue-500 py-1 px-3">
                      {`-${gameData?.price_overview?.discount_percent}% `}
                    </span>
                    <span className="line-through text-[rgba(0,0,0,0.40)] text-xl">
                      &#8377;
                      {gameData?.price_overview?.initial?.toLocaleString("en-IN")}{" "}
                    </span>
                    <span className="text-xl">
                      &#8377;
                      {gameData?.price_overview?.final?.toLocaleString("en-IN")}
                    </span>
                  </>
                ) : (
                  <span className="text-xl">
                    {gameData?.price_overview?.final
                      ? `₹${gameData?.price_overview?.final}`
                      : gameData?.release_date?.coming_soon
                        ? "Coming soon"
                        : "Free to Play"}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4">
                {!gameData?.release_date?.coming_soon && (
                  <button className="py-4 px-6 bg-white text-black rounded-lg text-sm font-semibold">
                    BUY NOW
                  </button>
                )}
                <button className="flex items-center gap-1">
                  {/* {heartFill ? <AiFillHeart /> : <AiOutlineHeart />} */}
                  ADD TO WISHLIST
                </button>
              </div>
            </div>
          </div>
        </section>
      </header>

      {/* trailers  */}
      {gameData?.movies && (
        <section className="py-10 maxWidth">
          <div className="py-4">
            <h1 className="font-bold text-4xl">Trailers</h1>
            <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
          </div>
          <div className=" flex gap-4 overflow-x-scroll scrollbar py-5 h-[250px]">
            {gameData?.movies?.map((item: { id: number, thumbnail: string, name: string, mp4: { max: string } }) => (
              <ModalVideo item={item} key={item.id} />
            ))}
          </div>
        </section>
      )}

      {/* screenshots  */}
      <section className="py-10 maxWidth">
        <div className="py-4">
          <h1 className="font-bold text-4xl ">Screenshots</h1>
          <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
        </div>
        <section className="flex gap-4 overflow-x-scroll scrollbar py-5 h-[250px]">
          {gameData?.screenshots?.map((item: { id: number, path_full: string }) => (
            <ImageBox key={item?.id} realImage={item?.path_full} errorImage={item?.path_full} customStyle={'rounded'} />
          ))}
        </section>


        {/* <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          slidesPerView={3}
          spaceBetween={20}
        >
          {gameData?.screenshots?.map((item: { id: number, path_full: string }) => (
            <SwiperSlide key={item.id}>
              <Link href={item.path_full} target="_blank">
                <Image
                  src={item.path_full}
                  alt=""
                  width={1920}
                  height={1080}
                  className="rounded"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper> */}
      </section>

      {/* about_the_game  */}
      <section className="py-10 maxWidth">
        <div className="py-4">
          <h1 className="font-bold text-4xl">About the Game</h1>
          <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
        </div>
        <div className="text-lg py-2">
          {parse(`${gameData?.about_the_game}`)}
        </div>
        <div className="py-4">
          <h1 className="pt-10 font-bold text-3xl">System Requirements :</h1>
          <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
        </div>
        <div className="grid grid-cols-2 gap-4 py-10 requirement text-lg">
          <div>{parse(`${gameData?.pc_requirements?.minimum}`)}</div>
          <div>{parse(`${gameData?.pc_requirements?.recommended}`)}</div>
        </div>
        <div className="text-sm text-[#555555]">
          {parse(`${gameData?.legal_notice}`)}
        </div>
      </section>

      <Dlc dlc={dlcData} />

      {/* reviews  */}
      {!!reviews?.reviews.length && (
        <section className="py-10 maxWidth">
          <div className="py-4">
            <h1 className="font-bold text-4xl ">Reviews</h1>
            <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
          </div>
          <div className="relative">
            <div className={`flex gap-8 scrollBar ${reviews?.reviews.length > 3 && "overflow-x-scroll"} `}
            >
              {reviews?.reviews.map((item: TReviewData) => (
                <Reviews key={item.recommendationid} review={item} />
              ))}
            </div>
            {reviews?.reviews.length > 3 && (
              <div className="absolute top-0 right-0 h-full bg-gradient-to-l from-[rgba(0,0,0,0.70)] w-[10%]" />
            )}
          </div>
        </section>
      )}

      {/* news  */}
      {!!news?.length && (
        <section className="py-10 maxWidth ">
          <div className="py-4">
            <h1 className="font-bold text-4xl">News :</h1>
            <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
          </div>
          <div className="max-w-[1000px] mx-auto flex flex-col gap-20">
            {news?.map((item: TNewsData) => (
              <News key={item.gid} item={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default GameProfileClient;
