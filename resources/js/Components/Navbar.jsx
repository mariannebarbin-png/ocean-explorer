import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {
    const page = usePage();
    const collectionCount = page.props.collectionCount || 0;
    const { url } = page;

    const linkClass = (path) =>
        url && url.startsWith(path)
            ? "text-cyan-400 font-bold"
            : "hover:text-cyan-300 transition";

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-md shadow-md z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <Link href="/" className="text-2xl font-extrabold text-white">
                    Ocean Explorer
                </Link>

                <div className="flex gap-6 items-center text-lg text-white">
                    <Link href="/explore" className={linkClass("/explore")}>Explore</Link>
                    <Link href="/collection" className={linkClass("/collection") + " inline-flex items-center gap-2"}>
                        <span>Collection</span>
                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full bg-cyan-500 text-white">
                            {collectionCount}
                        </span>
                    </Link>

                    <Link href={route('logout')} method="post" as="button" className="ml-4 text-sm text-white/90 hover:text-white">
                        Log Out
                    </Link>
                </div>
            </div>
        </nav>
    );
}
