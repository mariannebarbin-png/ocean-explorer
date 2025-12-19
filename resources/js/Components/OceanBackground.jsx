import React, { useEffect, useRef, useState } from "react";

export default function OceanBackground() 
{
    const [overlayOpacity, setOverlayOpacity] = useState(0);
    const fishRef1 = useRef(null);
    const fishRef2 = useRef(null);

    // Random bubble generator
    useEffect(() => {
        // darken background a bit as the user scrolls down
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
                    const ratio = Math.min(window.scrollY / (max * 0.6), 1); // earlier darken
                    setOverlayOpacity(ratio * 0.8);
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll);
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    
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

            container?.appendChild(bubble);

            setTimeout(() => bubble.remove(), 10000);
        }

        const bubbleInterval = setInterval(createBubble, 400);

        return () => clearInterval(bubbleInterval);
    }, []);

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

    function Corals() {
    const coralCount = 8; // number of corals
    const corals = [];

    for (let i = 0; i < coralCount; i++) {
        const left = Math.random() * 100; // random horizontal position
        const scale = 0.3 + Math.random() * 0.3; // random size

        corals.push(
                <img
                key={i}
                src="/pictures/coral.png" // make sure you have a coral.png in public/pictures
                alt="Coral"
                className="absolute bottom-0"
                style={{
                    left: `${left}vw`,
                    bottom: 0,
                    transform: `scale(${scale})`,
                    zIndex: 0,
                }}
            />
        );
    }

    return <>{corals}</>;
}


    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-to-b from-[#00263f] via-[#003f7f] to-[#0077be]"></div>

            {/* scroll-based dark overlay */}
            <div
                style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)', opacity: overlayOpacity }}
                className="absolute inset-0 pointer-events-none"
            />

            
            <div id="bubble-container" className="absolute inset-0"></div>

            <div className="absolute inset-x-0 bottom-0 pointer-events-none">
                <Corals />
            </div>
            <img
                ref={fishRef1}
                src="/pictures/fish2.png"
                className="fish swim"
                alt="Fish 1"
            />

            
            <img
                ref={fishRef2}
                src="/pictures/submarine.png"
                className="fish swim scale-x-[-1] opacity-70"
                alt="Fish 2"
            />
        </div>
    );
}