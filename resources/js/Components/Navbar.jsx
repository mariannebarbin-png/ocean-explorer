import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {
    const page = usePage();
    const { url } = page;
    // Safely resolve named routes (Ziggy) if available, otherwise fall back to hardcoded paths
    const exploreHref = typeof route !== 'undefined' ? route('explore') : '/explore';
    const logoutHref = typeof route !== 'undefined' ? route('logout') : '/logout';

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
                    <Link href={exploreHref} className={linkClass("/explore")}>Explore</Link>
                    <Link href={route ? route('collection.index') : '/collection'} className={linkClass("/collection") + " inline-flex items-center gap-2"}>
                        <span>Collection</span>
                    </Link>

                    <Link href={logoutHref} method="post" as="button" className="ml-4 text-sm text-white/90 hover:text-white">
                        Log Out
                    </Link>
                </div>
            </div>
        </nav>
    );
}
