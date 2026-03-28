import {useEffect, useState} from "react";
import './timer.css'
import * as React from "react";

interface TimerProps {
    goal_date: Date
}

const Timer : React.FC<TimerProps> = ({goal_date}) => {


    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = goal_date.getTime() - now.getTime(); // milliseconds left

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(difference / (1000 * 60 * 60) % 24);
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const [time_left, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer); // cleanup on unmount
    }, [calculateTimeLeft, goal_date]);



    return (
        <div className="countdown-container">
            <div className="countdown-item">
                <span className="countdown-number">
                    {time_left.days.toString().padStart(2, "0")}
                </span>
                <span className="countdown-label">jours</span>
            </div>
            <div className="countdown-item">
                <span className="countdown-number">
                    {time_left.hours.toString().padStart(2, "0")}
                </span>
                <span className="countdown-label">heures</span>
            </div>
            <div className="countdown-item">
                <span className="countdown-number">
                    {time_left.minutes.toString().padStart(2, "0")}
                </span>
                <span className="countdown-label">minutes</span>
            </div>
            <div className="countdown-item">
                <span className="countdown-number">
                    {time_left.seconds.toString().padStart(2, "0")}
                </span>
                <span className="countdown-label">secondes</span>
            </div>
        </div>
    )
}

export default Timer;