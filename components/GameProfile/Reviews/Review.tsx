"use client";
import React from "react";
import {
    BsFillHandThumbsUpFill,
    BsFillHandThumbsDownFill,
    BsDot,
} from "../../reactIcons";
import moment from 'moment';
import { TReviewData } from "@/types";
import { TReviewPerson } from "./Reviews";
import { Avatar, Card } from "antd";
import parser from "bbcode-to-react";

type Props = {
    review: TReviewData['reviews'][0]
    personDetails: TReviewPerson
}

const Review: React.FC<Props> = ({ review, personDetails }) => {
    const reviewContent = parser.toReact(review.review)

    return (
        <Card
            className="min-w-[300px] sm:max-w-[340px] my-3 space-y-5"
            styles={{ body: { height: '100%', display: 'flex', flexDirection: 'column' } }}
        >
            <div className="flex gap-2 sm:gap-5">
                <Avatar src={personDetails?.image} />
                <div className="flex flex-col items-center justify-center text-sm">
                    <div className="flex items-center">
                        <h4 className=" font-semibold leading-none text-white/70 truncate">@{personDetails?.username}</h4>
                        <BsDot />
                        <h5 className="tracking-tight text-white/60">{moment.unix(review.timestamp_created).format('DD MMM, YYYY')}</h5>
                    </div>
                    <h5 className="tracking-tight text-left w-full text-white/60">{personDetails?.firstName ?? ''} </h5>
                </div>
            </div>

            <div className='py-2'>
                {
                    review.voted_up
                        ? <BsFillHandThumbsUpFill className="text-green-500" size={20} />
                        : <BsFillHandThumbsDownFill className="text-red-500" size={20} />
                }

            </div>
            <div className='p-3 text-small text-white/90 overflow-auto whitespace-pre-wrap max-h-[300px]' >
                {reviewContent}
            </div>
            <div className="flex flex-col mt-auto">
                <br />
                <span className="font-semibold text-white text-sm">{review.votes_up} <span className="text-white/60 ">people found this review helpful</span></span>
                {
                    !!review.votes_funny &&
                    <span className="font-semibold text-white text-sm">{review.votes_funny} <span className="text-white/60 ">people found this review funny</span></span>
                }
            </div>
        </Card>
    );
};

export default Review;
