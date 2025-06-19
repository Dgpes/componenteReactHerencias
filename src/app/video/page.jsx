"use client";

import { useState, useEffect, useRef } from "react";
import { Typography, Card, CardHeader, CardBody } from "@/components/ui";
import { Button } from "@material-tailwind/react";

export default function Video() {
    const [volume, setVolume] = useState(1); // Volume state (0 to 1)
    const videoRef = useRef(null);

    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const handleVolumeUp = () => {
        if (volume < 1) {
            const newVolume = parseFloat((volume + 0.1).toFixed(1));
            setVolume(newVolume);
            videoRef.current.volume = newVolume;
        }
    };

    const handleVolumeDown = () => {
        if (volume > 0) {
            const newVolume = parseFloat((volume - 0.1).toFixed(1));
            setVolume(newVolume);
            videoRef.current.volume = newVolume;
        }
    };

    return (
        <div className="p-4 flex justify-center">
            <Card className="w-full max-w-2xl">
                <CardHeader variant="gradient" color="blue" className="mb-4 p-4">
                    <Typography variant="h2">
                        Video de la mission
                    </Typography>
                </CardHeader>
                <CardBody>
                    <video preload="metadata" ref={videoRef}>
                        <source src="https://www.nasa.gov/wp-content/uploads/2025/02/loi2-moon-and-earth-shotmp4.mp4" type="video/mp4" />
                    </video>
                    <div className="flex gap-2 mt-4 justify-center">
                        <Button onClick={handlePlayPause}>Play/Pause</Button>
                        <div>
                            <h2 className="flex gap-2 justify-center">Volume</h2>
                            <Button onClick={handleVolumeUp}>+</Button>
                            <Button onClick={handleVolumeDown}>-</Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}