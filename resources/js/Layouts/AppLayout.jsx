import React from "react";
import Navbar from "@/Components/Navbar";
import Fish from "@/Components/fish";
import Submarine from "@/Components/submarine";
import OceanBackground from "@/Components/OceanBackground";


export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0cc6df] via-[#004b63] to-[#00192f] pb-20 text-white">
            <OceanBackground />

            
            <Fish />
            <Submarine />

            <Navbar />

            <main className="pt-20 pb-10 px-6 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}
