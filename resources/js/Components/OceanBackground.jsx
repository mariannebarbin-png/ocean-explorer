import React, { useEffect, useRef, useState } from "react";

export default function OceanBackground() {
    const [overlayOpacity, setOverlayOpacity] = useState(0);
    const fishRef1 = useRef(null);
    const fishRef2 = useRef(null);

    /* -----------------------------------
       Scroll-based darkening (depth effect)
    ------------------------------------ */
    useEffect(() => {
        let ticking = false;

        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const max = Math.max(
                        document.documentElement.scrollHeight - window.innerHeight,
                        1
                    );
                    const ratio = Math.min(window.scrollY / (max * 0.6), 1);
                    setOverlayOpacity(ratio * 0.85);
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener("scroll", onScroll);
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ------------------------
       Bubble generator
    ------------------------- */
    useEffect(() => {
        const container = document.getElementById("bubble-container");

        function createBubble() {
            if (!container) return;

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

        const interval = setInterval(createBubble, 400);
        return () => clearInterval(interval);
    }, []);

    /* ------------------------
       Fish animation
    ------------------------- */
    useEffect(() => {
        const fishes = [fishRef1.current, fishRef2.current];

        fishes.forEach((fish) => {
            if (!fish) return;

            function swim() {
                const startY = Math.random() * window.innerHeight * 0.65;
                fish.style.top = `${startY}px`;
                fish.style.left = "-220px";

                const duration = Math.random() * 10 + 8;
                fish.style.animationDuration = `${duration}s`;

                fish.classList.remove("swim");
                void fish.offsetWidth;
                fish.classList.add("swim");
            }

            swim();
            fish.addEventListener("animationend", swim);
        });
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Ocean gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#00263f] via-[#003f7f] to-[#0077be]" />

            {/* Depth darkening overlay */}
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

            {/* ---------------- CORALS (FIXED) ---------------- */}
            <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-0">
                {/* Left coral */}
                <img
                    src="/pictures/coral.png"
                    alt="Left Coral"
                    className="
                        absolute
                        bottom-0
                        left-0
                        w-[260px]
                        opacity-80
                        blur-[0.5px]
                    "
                />

                {/* Right coral */}
                <img
                    src="/pictures/coral.png"
                    alt="Right Coral"
                    className="
                        absolute
                        bottom-0
                        right-0
                        w-[260px]
                        opacity-80
                        scale-x-[-1]
                        blur-[0.5px]
                    "
                />
            </div>

            {/* Fish */}
            <img
                ref={fishRef1}
                src="/pictures/fish2.png"
                className="fish swim"
                alt="Fish"
            />

            <img
                ref={fishRef2}
                src="/pictures/submarine.png"
                className="fish swim scale-x-[-1] opacity-70"
                alt="Submarine"
            />
        </div>
    );
}
