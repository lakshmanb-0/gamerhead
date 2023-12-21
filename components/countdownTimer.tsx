'use client'
import React from 'react'
import useCountdownTimer from './useCountdownTimer';

const CountdownTimer = ({ item }: { item: { discounted: boolean, discount_expiration: number } }) => {
    const { days, hours, minutes, seconds, timeIsPast } = useCountdownTimer(item?.discount_expiration);

    return (item?.discounted && timeIsPast) && (
        <div>
            <h1>{days} days </h1>
            <h1>{hours} hours </h1>
            <h1>{minutes} minutes </h1>
            <h1>{seconds} seconds </h1>
        </div>
    )
}

export default CountdownTimer