'use client'
import React, { useEffect } from 'react'
import { ImageBox } from '../index'
import { TReviewData, TSingleGameData } from '@/types'
import { MdDateRange, BsHandThumbsUp, AiFillHeart, AiFillWindows, AiOutlineHeart, RiMacLine, DiLinux } from '../reactIcons'
import { Tooltip } from 'antd'
import { StoreData, addCart, addWishlist, removeWishlist } from '../redux/reducers/auth.reducers'
import { RootState } from '../redux/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import { createCart, createWishlist, deleteWishlist } from '@/app/serverAction/mongodbApi'
import { useUser } from '@clerk/nextjs'

type Props = {
    gameData: TSingleGameData,
    reviews: TReviewData
}
const HeaderGame: React.FC<Props> = ({ gameData, reviews }) => {
    const { cartData, wishlistData } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const { user } = useUser()

    useEffect(() => {
        let localStorageData = JSON.parse(localStorage.getItem("recentlyViewed")!)
        let recentlyViewed = localStorageData?.filter((item: TSingleGameData) => item.steam_appid != data.steam_appid).slice(0, 6)
        localStorage.setItem("recentlyViewed", JSON.stringify([data, ...recentlyViewed ?? []]))
    }, [])

    let data = {
        header_image: gameData?.header_image,
        name: gameData?.name,
        is_free: gameData?.is_free,
        price_overview: gameData?.price_overview,
        steam_appid: gameData?.steam_appid
    }

    const addToCart = async () => {
        dispatch(addCart(data))
        toast.success("Ready to Play! 🎮");
        user?.id && await createCart(user?.id, data)
    }

    // add to wishlist 
    const addToWishlist = async () => {
        dispatch(addWishlist(data))
        toast.success("Quest in the Queue 📜");
        user?.id && await createWishlist(user?.id, data)
    }

    // remove to wishlist 
    const removeFromWishlist = async () => {
        dispatch(removeWishlist(data.steam_appid))
        toast.warning("Epic Quest Abandoned 🏴");
        user?.id && await deleteWishlist(user?.id, data.steam_appid)
    }

    return (
        <header className="relative text-white ">
            <div className="hidden lg:block lg:h-screen xl:h-screen relative w-full ">
                <ImageBox realImage={gameData?.screenshots?.[0]?.path_full} customStyle={'z-0 w-full h-full'} />
                <div className="bg-gradient-to-t from-[rgba(0,0,0,0.90)] z-10 absolute bottom-0 left-0 w-full h-full" />
            </div>

            <section className="lg:absolute bottom-0 left-0 z-20 w-full h-full grid gap-8 lg:grid-cols-2 px-4 md:px-10 py-10">
                <div className="sm:mt-auto">
                    <div className="flex gap-4">
                        <span className="flex gap-2 items-center">
                            <MdDateRange className="text-xl" />
                            {gameData?.release_date?.date}
                        </span>
                        <Tooltip title={`${handleReviewPositive(reviews)}% of the ${reviews?.query_summary?.total_reviews?.toLocaleString("en-IN")} user reviews for this game are positive`}>
                            <div
                                className="flex gap-2 items-center"
                            >
                                <BsHandThumbsUp className="text-xl" />
                                {reviews && reviews.query_summary?.review_score_desc}
                                <span className="text-sm">
                                    {`(${reviews && reviews.query_summary.total_reviews.toLocaleString("en")})`}
                                </span>
                            </div>
                        </Tooltip>

                    </div>
                    <h1 className="text-3xl sm:text-5xl font-bold py-4">
                        {gameData?.name}
                    </h1>

                    <div className="text-sm py-2 flex items-center gap-2">
                        <span className="opacity-60 ">Platform:</span>{" "}
                        <div className="flex gap-1 text-xl">
                            {gameData?.platforms?.windows && <AiFillWindows />}
                            {gameData?.platforms?.mac && <RiMacLine />}
                            {gameData?.platforms?.linux && <DiLinux />}
                        </div>
                    </div>
                    <div className="w-12 py-1">
                        <img src={gameData?.required_age == 0 ? "/rating/12.png" : "/rating/18.png"} />
                    </div>
                    <div className="text-sm py-1 flex gap-2">
                        <span className="opacity-60">Developer: </span>
                        <span>{gameData?.developers?.join(' , ')}</span>
                    </div>
                    <div className="text-sm py-1 flex gap-2">
                        <span className="opacity-60">Publishers: </span>
                        <span>{gameData?.publishers}</span>
                    </div>
                </div>

                {/* image left side  */}
                <div className="md:max-w-[60%] mx-auto backdrop-blur-lg bg-[rgba(255,255,255,0.4)] rounded-xl overflow-hidden h-fit my-auto order-first sm:order-last">
                    <div>
                        <ImageBox realImage={gameData?.header_image} customStyle={'rounded-b-none'} />
                    </div>
                    <div className="px-5 py-6">
                        <h1 className="text-[1rem] ">{gameData?.short_description}</h1>
                        <div className="py-3 flex flex-wrap gap-3">
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
                                    <span className="rounded bg-primary text-white py-1 px-3">
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
                                (isGameInCart(cartData, gameData?.steam_appid)) ?
                                    <button className="py-3 px-5 bg-primary text-white rounded-lg text-lg font-semibold cursor-default">
                                        Added to Cart
                                    </button>
                                    : <button className="py-3 px-5 bg-white text-black rounded-lg text-lg font-semibold" onClick={addToCart}>
                                        BUY NOW
                                    </button>
                            )}
                            {
                                (isGameInWishlist(wishlistData, gameData?.steam_appid)) ?
                                    <button className="flex items-center gap-1" onClick={removeFromWishlist}>
                                        <AiFillHeart />
                                        Remove from Wishlist
                                    </button>
                                    : <button className="flex items-center gap-1" onClick={addToWishlist}>
                                        <AiOutlineHeart />
                                        Add to Wishlist
                                    </button>
                            }

                        </div>
                    </div>
                </div>
            </section>
        </header>
    )
}

export default HeaderGame

const handleReviewPositive = (reviews: TReviewData) => {
    let total = reviews?.query_summary?.total_reviews;
    let positive = reviews?.query_summary?.total_positive;
    if (!total) return 0
    const percentage = (positive / total) * 100;
    return Math.floor(percentage);

};

const isGameInCart = (cartData: StoreData[], gameId: number) => {
    return cartData.some(game => game.steam_appid === gameId);
};

const isGameInWishlist = (wishlistData: StoreData[], gameId: number) => {
    return wishlistData.some(game => game.steam_appid === gameId);
};
