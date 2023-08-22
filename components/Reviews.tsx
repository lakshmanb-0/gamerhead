"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from "react-icons/bs";

const Reviews = ({ review }) => {
  const [readMore, setReadMore] = useState(false);
  const [reviewerData, setReviewerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://randomuser.me/api/")
        .then((result) => result.json())
        .then((data) => setReviewerData(data.results[0]));
    };
    fetchData();
  }, []);
  const handleTimestamp = (unix) => {
    let dateObject = new Date(unix * 1000);
    let dateString = dateObject.toLocaleDateString();
    return dateString;
  };

  const truncate = (str, n) => {
    return `${str}`.length > n ? str.substr(0, n - 1) + " ..." : str;
  };

  return (
    <div className="bg-[#0f0f0f] px-5 py-4 rounded mb-6">
      <div className="flex justify-between items-center py-3 ">
        <div className="flex gap-4 items-center">
          <div className="w-14 h-14 ">
            <Image
              src={reviewerData?.picture?.large || "/person.jpeg"}
              alt="Avatar"
              width={1080}
              height={1920}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col ">
            <span>{reviewerData?.login?.username}</span>
            <span className="text-sm">
              {handleTimestamp(review.timestamp_created)}
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
        className={`w-[400px] h-[200px] ${
          readMore && "overflow-y-scroll scrollBar"
        } my-4`}
        onClick={() =>
          review.review.length > 250 && setReadMore((prev) => !prev)
        }
      >
        {readMore ? review.review : truncate(review.review, 250)}
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
