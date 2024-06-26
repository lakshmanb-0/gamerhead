'use client'
import React, { useEffect, useRef, useState } from 'react'
import { News, Review } from '../../index'
import { TReviewData } from '@/types'
import { getNews } from '@/app/serverAction/apiCalls'

export type TReviewPerson = {
  image: string
  firstName: string
  username: string
}

type Props = {
  reviews: TReviewData['reviews']
  steamId: number
}
const Reviews: React.FC<Props> = ({ reviews, steamId }) => {
  const [personDetails, setPersonDetails] = useState<TReviewPerson[]>([])
  const reviewsRef = useRef(null);
  const [newsResponse, setNewsResponse] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(data => setPersonDetails(data?.users ?? []))
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const newsApi = await getNews(steamId);
      setNewsResponse(newsApi);
    };

    // Intersection observer callback
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        fetchData();
        observer.disconnect(); // Disconnect observer after fetching data once
      }
    };
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
    if (reviewsRef.current) {
      observer.observe(reviewsRef.current);
    }

    // Clean up
    return () => {
      if (reviewsRef.current) {
        observer.unobserve(reviewsRef.current);
      }
    };
  }, [steamId]);

  return (
    <section ref={reviewsRef}>
      {
        !!reviews?.length && <section className=" py-5 sm:py-10 maxWidth">
          <div className="py-4">
            <h1 className="font-bold text-4xl ">Reviews</h1>
            <div className="bg-[#6152c8] rounded h-1 w-[100px] " />
          </div>
          <div className="relative">
            <div className='flex gap-8 scrollBar overflow-auto'>
              {reviews?.map((item, index) => (
                <Review key={item.recommendationid} review={item} personDetails={personDetails[index]} />
              ))}
            </div>
          </div>
        </section>
      }
      <News news={newsResponse} />
    </section>

  )
}

export default React.memo(Reviews) 