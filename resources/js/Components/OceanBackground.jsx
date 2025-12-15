import React, { useEffect, useRef } from "react";

export default function OceanBackground() 
{
    const fishRef1 = useRef(null);
    const fishRef2 = useRef(null);

    // Random bubble generator
    useEffect(() => {
        const container = document.getElementById("bubble-container");

        function createBubble() {
            const bubble = document.createElement("div");
            const size = Math.random() * 12 + 8;

            bubble.className = "bubble";
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = Math.random() * window.innerWidth + "px";
            bubble.style.animationDuration = Math.random() * 6 + 4 + "s";

            container.appendChild(bubble);

            setTimeout(() => bubble.remove(), 10000);
        }

        const bubbleInterval = setInterval(createBubble, 400);

        return () => clearInterval(bubbleInterval);
    }, []);

    // Fish movement loop
    useEffect(() => {
        const fishes = [fishRef1.current, fishRef2.current];

        fishes.forEach((fish, index) => {
            function moveFish() {
                const startY = Math.random() * window.innerHeight * 0.7;
                const duration = Math.random() * 10 + 8;

                fish.style.top = `${startY}px`;
                fish.style.animationDuration = `${duration}s`;
                fish.classList.remove("swim");
                
                // re-trigger animation
                void fish.offsetWidth;
                fish.classList.add("swim");
            }

            moveFish();
            setInterval(moveFish, 15000);
        });
    }, []);

    return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

        {/* Ocean gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001f3f] via-[#003f7f] to-[#0077be]"></div>

        {/* Bubble container */}
        <div id="bubble-container" className="absolute inset-0"></div>

        {/* Fish 1 */}
        <img
            ref={fishRef1}
            src="/fish1.png"
            className="fish"
            style={{ top: "30%" }}
        />

        {/* Fish 2 */}
        <img
            ref={fishRef2}
            src="/fish2.png"
            className="fish opacity-70 scale-x-[-1]"
            style={{ top: "60%" }}
        />
    </div>
);
}