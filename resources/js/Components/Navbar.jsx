import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {
    const { url } = usePage();

    const linkClass = (path) =>
        url.startsWith(path)
            ? "text-cyan-400 font-bold"
            : "hover:text-cyan-300 transition";

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-md shadow-md z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <Link href="/" className="text-2xl font-extrabold">
                    🌊 Ocean Explorer
                </Link>

                <div className="flex gap-6 text-lg">
                    <Link href="/explore" className={linkClass("/explore")}>
                        Explore
                    </Link>
                    <Link href="/collection" className={linkClass("/collection")}>
                        Collection
                    </Link>
                    <Link href="/journal" className={linkClass("/journal")}>
                        Journal
                    </Link>
                </div>
            </div>
        </nav>
    );
}
