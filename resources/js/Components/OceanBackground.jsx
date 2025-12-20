import React, { useEffect, useRef, useState } from "react";

export default function OceanBackground() {
    const [overlayOpacity, setOverlayOpacity] = useState(0);
    const fishRef1 = useRef(null);
    const fishRef2 = useRef(null);

    /* ---------------------------------
       Darken background on scroll
    ---------------------------------- */
    useEffect(() => {
        let ticking = false;

        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const max =
                        Math.max(
                            document.documentElement.scrollHeight -
                                window.innerHeight,
                            1
                        );

                    const ratio = Math.min(
                        window.scrollY / (max * 0.6),
                        1
                    );

                    setOverlayOpacity(ratio * 0.8);
                    ticking = false;
                });

                ticking = true;
            }
        }

        window.addEventListener("scroll", onScroll);
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ---------------------------------
       Bubble generator
    ---------------------------------- */
    useEffect(() => {
        const container = document.getElementById("bubble-container");

        function createBubble() {
            const bubble = document.createElement("div");
            const size = Math.random() * 12 + 8;

            bubble.className = "bubble";
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = Math.random() * window.innerWidth + "px";
            bubble.style.animationDuration =
                Math.random() * 6 + 4 + "s";

            container?.appendChild(bubble);

            setTimeout(() => bubble.remove(), 10000);
        }

        const interval = setInterval(createBubble, 400);
        return () => clearInterval(interval);
    }, []);

    /* ---------------------------------
       Fish animation
    ---------------------------------- */
    useEffect(() => {
        const fishes = [fishRef1.current, fishRef2.current];

        fishes.forEach((fish) => {
            if (!fish) return;

            function startSwim() {
                const startY = Math.random() * window.innerHeight * 0.7;
                fish.style.top = `${startY}px`;
                fish.style.left = "-200px";

                const duration = Math.random() * 10 + 8;
                fish.style.animationDuration = `${duration}s`;

                fish.classList.remove("swim");
                void fish.offsetWidth;
                fish.classList.add("swim");
            }

            startSwim();
            fish.addEventListener("animationend", startSwim);
        });
    }, []);

    /* ---------------------------------
       Corals (BOTTOM EDGES ONLY)
    ---------------------------------- */
    function Corals() {
        return (
            <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-0">
                {/* Left corals */}
                <img
                    src="/pictures/coral.png"
                    alt="Coral"
                    className="absolute bottom-0 left-0 w-40 md:w-56 opacity-90"
                />

                <img
                    src="/pictures/coral.png"
                    alt="Coral"
                    className="absolute bottom-0 left-24 w-32 md:w-44 opacity-80"
                />

                {/* Right corals */}
                <img
                    src="/pictures/coral.png"
                    alt="Coral"
                    className="absolute bottom-0 right-0 w-40 md:w-56 opacity-90 scale-x-[-1]"
                />

                <img
                    src="/pictures/coral.png"
                    alt="Coral"
                    className="absolute bottom-0 right-24 w-32 md:w-44 opacity-80 scale-x-[-1]"
                />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Ocean gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#00263f] via-[#003f7f] to-[#0077be]" />

            {/* Scroll dark overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
                    opacity: overlayOpacity,
                }}
            />

            {/* Bubbles */}
            <div id="bubble-container" className="absolute inset-0" />

            {/* Corals */}
            <Corals />

            {/* Fish */}
            <img
                ref={fishRef1}
                src="/pictures/fish2.png"
                alt="Fish"
                className="fish swim"
            />

            <img
                ref={fishRef2}
                src="/pictures/submarine.png"
                alt="Submarine"
                className="fish swim scale-x-[-1] opacity-70"
            />
        </div>
    );
}
