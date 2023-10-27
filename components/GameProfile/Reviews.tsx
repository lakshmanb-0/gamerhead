"use client";
import React, { useEffect, useState } from "react";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";
import parser from "bbcode-to-react";
import moment from 'moment';
import ImageBox from "../ImageBox";

const Reviews = ({ review }: any) => {
  const [readMore, setReadMore] = useState(false);
  const [reviewContent, setReviewContent] = useState<any>('')
  const [reviewerData, setReviewerData] = useState<any>([]);

  useEffect(() => {
    fetch(`/api/getplayer/?steamId=${review?.author?.steamid}`).then((res) => res.json())
      .then((data) => {
        setReviewerData(data.data.response.players[0]);
      })
    setReviewContent(parser.toReact(review.review));
  }, []);

  console.log(review);
  console.log(reviewContent);

  function truncate(str: string) {
    return str?.length > 250 ? str?.substring(0, 240) + "..." : str;
  }

  return (
    <div className="bg-[#0f0f0f] px-5 py-4 rounded mb-6">
      <div className="flex justify-between items-center py-3 ">
        <div className="flex gap-4 items-center">
          <div className="w-14 h-14 ">
            <ImageBox realImage={reviewerData?.avatarfull} errorImage={"/person.jpeg"} customStyle={'rounded-full'} />
          </div>
          <div className="flex flex-col ">
            <span>{reviewerData?.personaname}</span>
            <span className="text-sm">
              {moment(review.timestamp_created).format('DD-MM-YYYY')}
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
