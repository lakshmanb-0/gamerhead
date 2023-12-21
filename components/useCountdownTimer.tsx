import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';

const useCountdownTimer = (unixTime: number) => {

    const targetDate = moment(moment.unix(unixTime).format('YYYY-MM-DD'));

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetDate));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(targetDate));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [targetDate]);

    function calculateTimeRemaining(targetDate: Moment) {
        const now = moment();
        if (targetDate.isBefore(now)) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                timeIsPast: true,
            };
        }

        const diff = moment.duration(targetDate.diff(now));
        const days = diff.days();
        const hours = diff.hours();
        const minutes = diff.minutes();
        const seconds = diff.seconds();

        return {
            days,
            hours,
            minutes,
            seconds,
            timeIsPast: false
        };
    }

    return {
        days: timeRemaining.days,
        hours: timeRemaining.hours,
        minutes: timeRemaining.minutes,
        seconds: timeRemaining.seconds,
        timeIsPast: timeRemaining.timeIsPast
    }
}

export default useCountdownTimer;

