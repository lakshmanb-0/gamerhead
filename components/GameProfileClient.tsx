"use client";
import React, { useState } from "react";
import parse from "html-react-parser";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import Image from "next/image";
import Reviews from "./Reviews";
import News from "./News";
import { BsHandThumbsUp } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { AiFillWindows } from "react-icons/ai";
import { RiMacLine } from "react-icons/ri";
import { DiLinux } from "react-icons/di";

const GameProfileClient = ({ gameData, news, reviews }: any) => {
  const [imageUrl, setImageUrl] = useState<string>(gameData.background_raw);
  // get percentage of positive reviews
  const handleReviewPositive = (total: string, positive: string) => {
    const percentage = (parseInt(positive) / parseInt(total)) * 100;
    return Math.floor(percentage);
  };

  const handleImageError = () => {
    setImageUrl(gameData.screenshots[0].path_full);
  };
  return (
    <main>
      <header className="h-screen relative text-white">
        <Image
          src={imageUrl}
          onError={() => handleImageError()}
          alt="Background Image"
          width={1920}
          height={1080}
          className="absolute top-0 left-0 z-0"
        />
        <div className="bg-gradient-to-t from-[rgba(0,0,0,0.50)] z-10 absolute top-0 left-0 h-screen w-full" />
        <section className="absolute bottom-0 left-0 z-20 w-full h-full grid gap-4 sm:grid-cols-2 px-4 sm:px-20 py-10">
          <div className="sm:mt-auto">
            <div className="flex gap-4">
              <span className="flex gap-2 items-center">
                <MdDateRange className="text-xl" />
                {gameData.release_date.date}
              </span>
              <div
                className="flex gap-2 items-center"
                title={`${handleReviewPositive(
                  reviews?.query_summary.total_reviews,
                  reviews?.query_summary.total_positive
                )}% of the ${reviews?.query_summary.total_reviews.toLocaleString(
                  "en-IN"
                )} user reviews for this game are positive`}
              >
                <BsHandThumbsUp className="text-xl" />
                {reviews ? reviews.query_summary.review_score_desc : ""}
                <span className="text-sm">
                  {` (${
                    reviews
                      ? reviews.query_summary.total_reviews.toLocaleString(
                          "en-IN"
                        )
                      : ""
                  })`}
                </span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold py-4">
              {gameData.name}
            </h1>
            <div className="text-sm py-1">
              <span className="opacity-60">Features: </span>
              <span>
                {gameData?.categories?.map(
                  (item: any, index: number) =>
                    index < 3 && `${item.description}, `
                )}
              </span>
            </div>
            <div className="text-sm py-2 flex items-center gap-4">
              <span className="opacity-60 ">Platform:</span>{" "}
              <div className="flex gap-1 text-xl">
                {gameData.platforms.windows && <AiFillWindows />}
                {gameData.platforms.mac && <RiMacLine />}
                {gameData.platforms.linux && <DiLinux />}
              </div>
            </div>
            <div className="w-12 py-1">
              <Image
                src={
                  gameData.required_age == 0
                    ? "/rating/12.png"
                    : "/rating/18.png"
                }
                alt="12"
                width={1920}
                height={1080}
              />
            </div>
            <div className="py-1">
              Developer: <span>{gameData.developers}</span>
            </div>
            <div>
              Publishers: <span>{gameData.publishers}</span>
            </div>
          </div>

          {/* image left side  */}
          <div className="sm:w-[60%] mx-auto backdrop-blur-lg bg-[rgba(255,255,255,0.4)] rounded-xl h-fit my-auto ">
            <div>
              <Image
                src={gameData.header_image}
                alt={gameData.name}
                width={1920}
                height={1080}
                className="rounded-xl"
              />
            </div>
            <div className="px-5 py-8">
              <h1 className="text-[1rem] ">{gameData.short_description}</h1>
              <div className="py-3 flex gap-3">
                {gameData?.genres?.map(
                  (item, index) =>
                    index < 3 && (
                      <button
                        key={item.id}
                        className="bg-white text-black px-4 py-1 rounded font-semibold "
                      >
                        {item.description}
                      </button>
                    )
                )}
              </div>
              <div className="flex gap-2 items-center">
                {gameData?.price_overview?.discount_percent > 0 ? (
                  <>
                    <span className="rounded bg-blue-500 py-1 px-3">
                      {"-"}
                      {gameData.price_overview.discount_percent}%{" "}
                    </span>
                    <span className="line-through text-[rgba(0,0,0,0.40)] text-xl">
                      &#8377;
                      {gameData.price_overview.initial.toLocaleString(
                        "en-IN"
                      )}{" "}
                    </span>
                    <span className="text-xl">
                      &#8377;
                      {gameData.price_overview.final.toLocaleString("en-IN")}
                    </span>
                  </>
                ) : (
                  <span className="text-xl">
                    {gameData?.price_overview?.final
                      ? `₹${gameData?.price_overview?.final}`
                      : gameData.release_date.coming_soon
                      ? "Coming soon"
                      : "Free to Play"}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 pt-4">
                {!gameData.release_date.coming_soon && (
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
      {gameData.movies && (
        <section className="py-10 maxWidth">
          <div className="py-4">
            <h1 className="font-bold text-4xl ">Trailers</h1>
            <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
          </div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation
            slidesPerView={2}
            spaceBetween={30}
          >
            {gameData?.movies?.map((item) => (
              <SwiperSlide key={item.id}>
                <video
                  controls
                  width={1920}
                  height={1080}
                  poster={item.thumbnail}
                  className="w-full h-full rounded-lg"
                  title={item.name}
                >
                  <source src={item.mp4.max} type="video/mp4" />
                  Your browser does not support HTML video.
                </video>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* screenshots  */}
      <section className="py-10 maxWidth">
        <div className="py-4">
          <h1 className="font-bold text-4xl ">Screenshots</h1>
          <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
        </div>

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          slidesPerView={3}
          spaceBetween={20}
        >
          {gameData?.screenshots?.map((item) => (
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
        </Swiper>
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
          <div>{parse(`${gameData?.pc_requirements.minimum}`)}</div>
          <div>{parse(`${gameData?.pc_requirements.recommended || ""}`)}</div>
        </div>
        <div className="text-sm text-[#555555]">
          {parse(`${gameData?.legal_notice || ""}`)}
        </div>
      </section>

      {/* reviews  */}
      {reviews?.reviews.length > 0 && (
        <section className="py-10 maxWidth">
          <div className="py-4">
            <h1 className="font-bold text-4xl ">Reviews</h1>
            <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
          </div>

          <div className="relative">
            <div
              className={`flex gap-8 scrollBar ${
                reviews?.reviews.length > 3 && "overflow-x-scroll"
              } `}
            >
              {reviews?.reviews.map((item, index) => (
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
      {news?.length > 0 && (
        <section className="py-10 maxWidth ">
          <div className="py-4">
            <h1 className="font-bold text-4xl">News :</h1>
            <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
          </div>

          <div className="max-w-[1000px] mx-auto flex flex-col gap-20">
            {news?.map((item) => (
              <News key={item.gid} item={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default GameProfileClient;
