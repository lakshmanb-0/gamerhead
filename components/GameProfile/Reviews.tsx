"use client";
import React, { useEffect, useState } from "react";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import parser from "bbcode-to-react";
import moment from 'moment';
import ImageBox from "../ImageBox";
import { getPlayer } from "@/app/server.ts/apiCalls";
import { TPlayer } from "@/types";
import { truncate } from "@/lib/utils";

type ReviewType = {
  recommendationid: string,
  author: {
    steamid: string,
    num_games_owned: number,
    num_reviews: number,
    playtime_forever: number,
    playtime_last_two_weeks: number,
    playtime_at_review: number,
    last_played: number
  },
  language: string,
  review: string,
  timestamp_created: number,
  timestamp_updated: number,
  voted_up: boolean,
  votes_up: number,
  votes_funny: number,
  weighted_vote_score: string,
  comment_count: number,
  steam_purchase: boolean,
  received_for_free: boolean,
  written_during_early_access: boolean,
}


const Reviews = ({ review }: { review: ReviewType }) => {
  const [readMore, setReadMore] = useState(false);
  const [reviewContent, setReviewContent] = useState<any>('')
  const [reviewerData, setReviewerData] = useState<TPlayer>();


  // getting player data 
  useEffect(() => {
    const playerDetail = async () => {
      const data = await getPlayer(review?.author?.steamid);
      setReviewerData(data?.[0]);
      setReviewContent(parser.toReact(review.review));
    }
    playerDetail()
  }, [])


  return (
    <div className="bg-[#0f0f0f] px-5 py-4 rounded mb-6">
      <div className="flex justify-between items-center py-3 ">
        <div className="flex gap-4 items-center">
          <div className="w-14 h-14 ">
            {/* <Image src={reviewerData.avatarfull} width={1080} height={1920} /> */}
            <ImageBox realImage={`https://avatars.steamstatic.com/${reviewerData?.avatar_url}_full.jpg`} errorImage='/person.jpeg' customStyle='rounded-full w-14 h-14' />
          </div>
          <div className="flex flex-col ">
            <span>{reviewerData?.persona_name ?? 'Unknown'}</span>
            <span className="text-sm">
              {moment.unix(review.timestamp_created).format('DD MMM, YYYY')}
            </span>
          </div>
        </div>
        <div className="text-2xl">
          {review.voted_up ? (
            <BsFillHandThumbsUpFill className="text-green-500" />
          ) : (
            <BsFillHandThumbsDownFill className="text-red-500" />
          )}
        </div>
      </div>
      <div
        className={`w-[400px] h-[200px] ${readMore ? "overflow-y-scroll scrollBar" : 'overflow-y-hidden'} my-4 whitespace-pre-wrap `}
        onClick={() =>
          reviewContent[0].length > 250 && setReadMore((prev) => !prev)
        }
      >
        {readMore ? reviewContent : truncate(reviewContent[0])}
      </div>
      <div className="text-sm">
        <span>{review.votes_up} people found this review helpful</span>
      </div>
      {review.votes_funny != 0 && (
        <div className="text-sm">
          <span>{review.votes_funny} people found this review funny</span>
        </div>
      )}
    </div>
  );
};

export default Reviews;
