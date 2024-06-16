"use client";
import React from "react";
import {
    BsFillHandThumbsUpFill,
    BsFillHandThumbsDownFill,
    BsDot,
} from "../../reactIcons";
// import parser from "bbcode-to-react";
import moment from 'moment';
import { TReviewData } from "@/types";
import { TReviewPerson } from "./Reviews";
import { Avatar, Card } from "antd";

type Props = {
    review: TReviewData['reviews'][0]
    personDetails: TReviewPerson
}

const Review: React.FC<Props> = ({ review, personDetails }) => {
    const reviewContent = review.review
    // const reviewContent = parser.toReact(review.review)

    const recommendedCard = () => (
        <div className="flex items-center gap-2">
            {
                review.voted_up
                    ? <BsFillHandThumbsUpFill className="text-green-500" size={20} />
                    : <BsFillHandThumbsDownFill className="text-red-500" size={20} />
            }
            <div>
                {review.votes_up ? 'Recommended' : 'Not Recommended'}
                <p className="text-default-400">{`${moment.duration(review.author.playtime_last_two_weeks, 'minutes').asHours()}7.0 hrs last two weeks / 67.4 hrs on record (29.5 hrs at review time) `}</p>
            </div>

        </div>
    )
    console.log(review)
    return (
        // <Card className="min-w-[300px] sm:max-w-[340px] my-3">
        //     <CardHeader className="justify-between items-center">
        //         <div className="flex gap-2 sm:gap-5">
        //             <Avatar isBordered radius="full" size="md" src={personDetails?.image} />
        //             <div className="flex flex-col items-center justify-center text-sm">
        //                 <div className="flex items-center">
        //                     <h4 className=" font-semibold leading-none text-default-600 truncate">@{personDetails?.username}</h4>
        //                     <BsDot />
        //                     <h5 className="tracking-tight text-default-400">{moment.unix(review.timestamp_created).format('DD MMM, YYYY')}</h5>
        //                 </div>
        //                 <h5 className="tracking-tight text-left w-full text-default-400">{personDetails?.firstName ?? ''} </h5>
        //             </div>
        //         </div>
        //         <div className="text-xl">
        //             {
        //                 review.voted_up
        //                     ? <BsFillHandThumbsUpFill className="text-green-500" />
        //                     : <BsFillHandThumbsDownFill className="text-red-500" />
        //             }
        //         </div>
        //     </CardHeader>
        //     <Divider />
        //     <CardBody className='p-3 text-small text-default-400 overflow-auto whitespace-pre-wrap max-h-[300px]' >
        //         {reviewContent}
        //     </CardBody>
        //     <Divider />
        //     <CardFooter className="gap-3 pt-4">
        //         <div className="flex flex-col">
        //             <span className="font-semibold text-white text-small">{review.votes_up} <span className="text-default-400 ">people found this review helpful</span></span>
        //             {
        //                 !!review.votes_funny &&
        //                 <span className="font-semibold text-white text-small">{review.votes_funny} <span className="text-default-400 ">people found this review funny</span></span>
        //             }
        //         </div>
        //     </CardFooter>
        // </Card>
        <Card
            // title={<div className="flex justify-between items-center py- 1">
            //     <div className="flex gap-2 sm:gap-5">
            //         <Avatar size="small" src={personDetails?.image} />
            //         <div className="flex flex-col items-center justify-center text-sm">
            //             {/* <div className="flex items-center"> */}
            //             <h5 className="tracking-tight text-left w-full text-default-400">{personDetails?.username ?? ''} </h5>
            //             {/* <h5 className="tracking-tight text-default-400">{moment.unix(review.timestamp_created).format('DD MMM, YYYY')}</h5> */}
            //             {/* </div> */}
            //             <h5 className="tracking-tight text-left w-full text-default-400">{personDetails?.firstName ?? ''} </h5>
            //         </div>
            //     </div>
            //     <div className="text-xl">
            //         {
            //             review.voted_up
            //                 ? <BsFillHandThumbsUpFill className="text-green-500" />
            //                 : <BsFillHandThumbsDownFill className="text-red-500" />
            //         }
            //         <div>
            //             {review.votes_up ? 'Recommended' : 'Not Recommended'}
            //             <p>{`${moment.duration(review.author.playtime_last_two_weeks, 'minutes').asHours()}7.0 hrs last two weeks / 67.4 hrs on record (29.5 hrs at review time) `}</p>
            //         </div>

            //     </div>
            // </div>}
            title={recommendedCard()}
        >
            <div className='p-3 text-small text-default-400 overflow-auto whitespace-pre-wrap max-h-[300px]' >
                {reviewContent}
            </div>
        </Card>
    );
};

export default Review;
