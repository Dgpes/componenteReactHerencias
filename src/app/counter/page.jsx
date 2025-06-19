"use client";

import { useState, useRef } from "react";
import { Typography, Card, CardHeader, CardBody, Input } from "@/components/ui";
import { Button } from "@material-tailwind/react";

export default function Timer() {
    const [timer, setTimer] = useState(0); // Timer state (in seconds)
    const [inputTime, setInputTime] = useState(""); // Input field value
    const [isTimerRunning, setIsTimerRunning] = useState(false); // Timer running state
    const timerRef = useRef(null); // Ref to store the timer interval

    // Helper function to format time as 00:00:00:00
    const formatTime = (totalSeconds) => {
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        // Pad each unit with leading zeros
        const pad = (num) => num.toString().padStart(2, "0");

        return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    // Helper function to convert formatted time (HH:MM:SS) to total seconds
    const parseTimeToSeconds = (timeString) => {
        const parts = timeString.split(":").map(Number);
        let seconds = 0;

        if (parts.length === 4) {
            // DD:HH:MM:SS
            const [days, hours, minutes, secs] = parts;
            seconds = days * 86400 + hours * 3600 + minutes * 60 + secs;
        } else if (parts.length === 3) {
            // HH:MM:SS
            const [hours, minutes, secs] = parts;
            seconds = hours * 3600 + minutes * 60 + secs;
        } else if (parts.length === 2) {
            // MM:SS
            const [minutes, secs] = parts;
            seconds = minutes * 60 + secs;
        } else if (parts.length === 1) {
            // SS
            seconds = parts[0];
        }

        return seconds;
    };

    // Function to handle input change
    const handleInputChange = (e) => {
        const { value } = e.target;
        const newValue = value
            .replace(/[^0-9]/g, "") // Remove non-numeric characters
            .slice(0, 8); // Limit input length (DDHHMMSS)

        // Format the input as DD:HH:MM:SS
        let formattedValue = "";
        for (let i = 0; i < newValue.length; i++) {
            if (i === 2 || i === 4 || i === 6) {
                formattedValue += ":";
            }
            formattedValue += newValue[i];
        }

        setInputTime(formattedValue);
    };

    // Function to start the timer
    const startTimer = () => {
        const totalSeconds = parseTimeToSeconds(inputTime);
        if (totalSeconds > 0 && !isTimerRunning) {
            setTimer(totalSeconds); // Set the timer to the input value
            setIsTimerRunning(true); // Mark the timer as running

            // Start the countdown
            timerRef.current = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        clearInterval(timerRef.current); // Stop the timer when it hits 0
                        setIsTimerRunning(false); // Mark the timer as stopped
                        alert("Time's up! ⏰"); // Notify the user
                    }
                    return prevTimer - 1;
                });
            }, 1000); // Update every second
        }
    };

    // Function to stop the timer
    const stopTimer = () => {
        clearInterval(timerRef.current); // Stop the interval
        setIsTimerRunning(false); // Mark the timer as stopped
    };

    // Function to reset the timer
    const resetTimer = () => {
        clearInterval(timerRef.current); // Stop the interval (if running)
        setIsTimerRunning(false); // Mark the timer as stopped
        setTimer(0); // Reset the timer display
        setInputTime(""); // Clear the input field
    };

    // Function to resume the timer
    const resumeTimer = () => {
        if (timer > 0 && !isTimerRunning) {
            setIsTimerRunning(true); // Mark the timer as running

            // Resume the countdown
            timerRef.current = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        clearInterval(timerRef.current); // Stop the timer when it hits 0
                        setIsTimerRunning(false); // Mark the timer as stopped
                        alert("Time's up! ⏰"); // Notify the user
                    }
                    return prevTimer - 1;
                });
            }, 1000); // Update every second
        }
    };

    return (
        <div className="p-4 flex justify-center">
            <Card className="w-full max-w-2xl">
                <CardHeader variant="gradient" color="blue" className="mb-4 p-4">
                    <Typography variant="h2">
                        Countdown Timer
                    </Typography>
                </CardHeader>
                <CardBody>
                    <Typography variant="h3" className="mt-2">
                        Time Remaining:
                    </Typography>
                    <Typography variant="h3" color="red" className="mt-2">
                    {formatTime(timer)}
                    </Typography>
                    <div className="mt-4">
                        <Typography variant="h5" className="mb-2">
                            Set Timer (DD:HH:MM:SS):
                        </Typography>
                        <Input
                            type="text"
                            placeholder="DD:HH:MM:SS"
                            value={inputTime}
                            onChange={handleInputChange}
                            className="mb-2"
                        />
                        <div className="flex gap-2">
                            <Button onClick={startTimer} disabled={isTimerRunning || !inputTime}>
                                Start Timer
                            </Button>
                            <Button onClick={stopTimer} disabled={!isTimerRunning}>
                                Stop Timer
                            </Button>
                            <Button onClick={resumeTimer} disabled={isTimerRunning || timer === 0}>
                                Resume Timer
                            </Button>
                            <Button onClick={resetTimer} disabled={!inputTime && timer === 0}>
                                Reset Timer
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}