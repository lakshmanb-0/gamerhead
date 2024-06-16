'use client'
import React, { useEffect, useState } from 'react'
import { Review } from '../../index'
import { TReviewData } from '@/types'

export type TReviewPerson = {
  image: string
  firstName: string
  username: string
}

type Props = {
  reviews: TReviewData['reviews']
}
const Reviews: React.FC<Props> = ({ reviews }) => {
  const [personDetails, setPersonDetails] = useState<TReviewPerson[]>([])
  console.log('review render')

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(data => setPersonDetails(data?.users ?? []))
    }
    fetchData()
  }, [])

  return !!reviews?.length && (
    <section className=" py-5 sm:py-10 maxWidth">
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
  )
}

export default React.memo(Reviews) 