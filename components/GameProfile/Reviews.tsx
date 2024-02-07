"use client";
import React, { useEffect, useState } from "react";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import parser from "bbcode-to-react";
import moment from 'moment';
import { getPlayer } from "@/app/server.ts/apiCalls";
import { TPlayer } from "@/types";
import { Divider } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import { DotIcon } from "lucide-react";


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
    <Card className="min-w-[300px] sm:min-w-[340px] my-3">
      <CardHeader className="justify-between items-center">
        <div className="flex gap-2 sm:gap-5">
          <Avatar isBordered radius="full" size="md" src={reviewerData?.avatar_url?.includes('000000') ? '/noImage.jpeg' : `https://avatars.steamstatic.com/${reviewerData?.avatar_url}_full.jpg`} />
          <div className="flex flex-col items-center justify-center text-sm">
            <div className="flex items-center">
              <h4 className=" font-semibold leading-none text-default-600">@{reviewerData?.persona_name}</h4>
              <DotIcon />
              <h5 className="tracking-tight text-default-400">{moment.unix(review.timestamp_created).format('DD MMM, YYYY')}</h5>
            </div>
            <h5 className="tracking-tight text-left w-full text-default-400">{reviewerData?.real_name ?? ''} </h5>
          </div>
        </div>
        <div className="text-xl">
          {review.voted_up ? (
            <BsFillHandThumbsUpFill className="text-green-500" />
          ) : (
            <BsFillHandThumbsDownFill className="text-red-500" />
          )}
        </div>
      </CardHeader>
      <Divider />
      <CardBody className='p-3 text-small text-default-400 overflow-auto whitespace-pre-wrap max-h-[300px]' >
        {reviewContent}
      </CardBody>
      <Divider />
      <CardFooter className="gap-3 pt-4">
        <div className="flex flex-col">
          <span className="font-semibold text-white text-small">{review.votes_up} <span className="text-default-400 ">people found this review helpful</span></span>
          {review.votes_funny != 0 && (
            <span className="font-semibold text-white text-small">{review.votes_funny} <span className="text-default-400 ">people found this review funny</span></span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Reviews;
