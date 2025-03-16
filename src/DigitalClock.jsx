import React, { useState, useEffect } from 'react';

function DigitalClock() {             //initialState of the statehook
    const [time, setTime] = useState(new Date());
    const [isRunning, setIsRunning] = useState(true);
    const [is24HourFormat, setIs24HourFormat] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(new Date());
            }, 1000);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning]);

    function formatTime() {
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiam = hours >= 12 ? "PM" : "AM";

        if (!is24HourFormat) {
            hours = hours % 12 || 12;
            return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiam}`;
        }
        
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    }

    // 2 digit number
    function padZero(number) {
        return (number < 10 ? "0" : "") + number
    }

    return (
        <div className='container'>
            <div className='clock'>
                <span>{formatTime()}</span>
            </div>
            <div className ='button'>
            <button onClick={() => setIsRunning(true)}>Play</button>
            <button onClick={() => setIsRunning(false)}>Pause</button>
            <button onClick={() => setIs24HourFormat(!is24HourFormat)}>
                    Switch to {is24HourFormat ? "12-hour" : "24-hour"} format
                </button>
            </div>
        </div>
    )
}

export default DigitalClock;