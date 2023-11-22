import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';

function CountdownTimer(unixTime: number) {
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
        console.log();

        const now = moment();
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
        };
    }

    return {
        days: timeRemaining.days,
        hours: timeRemaining.hours,
        minutes: timeRemaining.minutes,
        seconds: timeRemaining.seconds,
    }
}

export default CountdownTimer;

