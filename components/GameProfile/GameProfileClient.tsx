"use client";
import React, { useState } from "react";
import parse from "html-react-parser";
import Reviews from "./Reviews";
import News from "./News";
import { BsHandThumbsUp } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { AiFillHeart, AiFillWindows, AiOutlineHeart } from "react-icons/ai";
import { RiMacLine } from "react-icons/ri";
import { DiLinux } from "react-icons/di";
import ImageBox from "../ImageBox";
import { TDlcData, TNewsData, TReviewData, TSingleGameData, TUser } from "@/types";
import ModalVideo from "../ui/ModalVideo";
import Dlc from "../LandingUi/Dlc";
import { createCart, createWishlist } from "@/app/server.ts/prismaDb";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";


type GameProfileClient = {
  gameData: TSingleGameData,
  news: TNewsData[],
  reviews: TReviewData,
  dlcData: TDlcData,
  currentUser: TUser | any
}

const GameProfileClient = ({ gameData, news, reviews, dlcData, currentUser }: GameProfileClient) => {
  const { user } = useUser();
  const [added, setAdded] = useState({ cart: false, wishlist: false })

  // get percentage of positive reviews
  const handleReviewPositive = (total: number, positive: number) => {
    if (!total) return 0
    const percentage = (positive / total) * 100;
    return Math.floor(percentage);
  };

  // add to cart 
  const addToCart = async (id: number) => {
    setAdded({ ...added, cart: true })
    let x = await createCart(user?.id!, id);
    // dispatch(addCart(x?.[0]?.cartData))
  }

  // add to wishlist 
  const addToWishlist = async (id: number) => {
    setAdded({ ...added, wishlist: true })
    let x = await createWishlist(user?.id!, id);
    // dispatch(addWishlist(x?.[0]?.wishlistData))
  }

  console.log(gameData);

  return (
    <main>
      <header className="h-screen relative text-white ">
        <div className="relative w-full h-full">
          <Image src={gameData?.screenshots?.[0].path_full ?? '/noImage.jpeg'} width={1080} height={1920} alt="backgroungImage" className={'z-0 w-full h-full'} />
          <div className="bg-gradient-to-t from-[rgba(0,0,0,0.90)] z-10 absolute bottom-0 left-0 w-full h-full" />
        </div>

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
                  {`(${reviews && reviews.query_summary.total_reviews.toLocaleString("en")})`}
                </span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold py-4">
              {gameData?.name}
            </h1>
            <div className="text-sm py-1 flex gap-2">
              <span className="opacity-60">Features: </span>
              <span>
                {gameData?.categories?.map((item, index: number) =>
                  index < 3 && `${item?.description} | `
                )}
              </span>
            </div>
            <div className="text-sm py-2 flex items-center gap-2">
              <span className="opacity-60 ">Platform:</span>{" "}
              <div className="flex gap-1 text-xl">
                {gameData?.platforms?.windows && <AiFillWindows />}
                {gameData?.platforms?.mac && <RiMacLine />}
                {gameData?.platforms?.linux && <DiLinux />}
              </div>
            </div>
            <div className="w-12 py-1">
              <Image src={gameData?.required_age == 0 ? "/rating/12.png" : "/rating/18.png"} width={1920} height={1920} alt="age" />
            </div>
            <div className="text-sm py-1 flex gap-2">
              <span className="opacity-60">Developer: </span>
              <span>{gameData?.developers}</span>
            </div>
            <div className="text-sm py-1 flex gap-2">
              <span className="opacity-60">Publishers: </span>
              <span>{gameData?.publishers}</span>
            </div>
          </div>

          {/* image left side  */}
          <div className="sm:w-[60%] mx-auto backdrop-blur-lg bg-[rgba(255,255,255,0.4)] rounded-xl h-fit my-auto ">
            <div>
              <ImageBox realImage={gameData?.header_image} errorImage={gameData?.background_raw} customStyle={'rounded-xl'} />
            </div>
            <div className="px-5 py-6">
              <h1 className="text-[1rem] ">{gameData?.short_description}</h1>
              <div className="py-3 flex gap-3">
                {gameData?.genres?.map((item, index) =>
                  index < 3 && (
                    <span
                      key={item.id}
                      className="bg-white text-black px-4 py-1 rounded font-semibold">
                      {item.description}
                    </span>
                  )
                )}
              </div>
              <div className="flex gap-2 items-center">
                {gameData?.price_overview?.discount_percent > 0 ? (
                  <>
                    <span className="rounded bg-blue-500 py-1 px-3">
                      {`-${gameData?.price_overview?.discount_percent}% `}
                    </span>
                    <span className="line-through text-[rgba(0,0,0,0.40)] text-xl">
                      {gameData?.price_overview?.initial_formatted}{" "}
                    </span>
                    <span className="text-xl">
                      {gameData?.price_overview?.final_formatted}
                    </span>
                  </>
                ) : (
                  <span className="text-xl">
                    {gameData?.price_overview?.final_formatted
                      ?? (gameData?.release_date?.coming_soon ? "Coming soon" : "Free to Play")}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 justify-between">
                {!gameData?.release_date?.coming_soon && (
                  (currentUser?.cartData?.includes(gameData?.steam_appid) || added.cart) ?
                    <button className="py-3 px-5 bg-green_color text-white rounded-lg text-lg font-semibold cursor-default">
                      Added to Cart
                    </button>
                    : <button className="py-3 px-5 bg-white text-black rounded-lg text-lg font-semibold" onClick={() => addToCart(gameData?.steam_appid)}>
                      BUY NOW
                    </button>
                )}
                <button className="flex items-center gap-1" onClick={() => addToWishlist(gameData?.steam_appid)}>
                  {(currentUser?.wishlistData?.includes(gameData?.steam_appid) || added.wishlist) ? <AiFillHeart /> : <AiOutlineHeart />}
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </section>
      </header>

      {/* trailers  */}
      {gameData?.movies && (
        <section className="py-7 sm:py-10 maxWidth">
          <div className="py-4">
            <h1 className="font-bold text-4xl">Trailers</h1>
            <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
          </div>
          <div className=" flex gap-4 overflow-auto scrollbar py-5 ">
            {gameData?.movies?.map((item) => (
              <ModalVideo item={item} key={item.id} />
            ))}
          </div>
        </section>
      )}

      {/* screenshots  */}
      {gameData?.screenshots &&
        <section className="py-7 sm:py-10 maxWidth">
          <div className="py-4">
            <h1 className="font-bold text-4xl ">Screenshots</h1>
            <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
          </div>
          <section className="flex gap-4 overflow-auto scrollbar py-5">
            {gameData?.screenshots?.map((item) => (
              <a className="min-w-[300px]" href={item.path_full} target="_blank">
                <ImageBox key={item?.id} realImage={item?.path_thumbnail} errorImage={item?.path_full} customStyle={'rounded'} />
              </a>
            ))}
          </section>
        </section>}

      {/* about_the_game  */}
      {gameData?.about_the_game &&
        <section className="newsContent py-7 sm:py-10 maxWidth">
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
          <div className="grid  md:grid-cols-2 gap-4 py-10 requirement text-lg">
            <div>{parse(`${gameData?.pc_requirements?.minimum ?? ''}`)}</div>
            <div>{parse(`${gameData?.pc_requirements?.recommended ?? ''}`)}</div>
          </div>
          <div className="text-sm text-[#555555]">
            {parse(`${gameData?.legal_notice ?? ''}`)}
          </div>
        </section>}
      <section className="py-5 maxWidth">
        <Dlc dlcData={dlcData} />
      </section>

      {/* reviews  */}
      {!!reviews?.reviews.length && (
        <section className="py-10 maxWidth">
          <div className="py-4">
            <h1 className="font-bold text-4xl ">Reviews</h1>
            <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
          </div>
          <div className="relative">
            <div className='flex gap-8 scrollBar overflow-auto'>
              {reviews?.reviews.map((item) => (
                <Reviews key={item.recommendationid} review={item} />
              ))}
            </div>
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
