import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {
    const page = usePage();
    const { url } = page;
    const [loadingRoute, setLoadingRoute] = useState(null);

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
                    <Link
                        href="/explore"
                        className={linkClass("/explore")}
                        onClick={() => setLoadingRoute('explore')}
                    >
                        {loadingRoute === 'explore' ? 'Explore…' : 'Explore'}
                    </Link>

                    <Link
                        href="/collection"
                        className={linkClass("/collection") + " inline-flex items-center gap-2"}
                        onClick={() => setLoadingRoute('collection')}
                    >
                        <span>{loadingRoute === 'collection' ? 'Collection…' : 'Collection'}</span>
                    </Link>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="ml-4 text-sm text-white/90 hover:text-white"
                        onClick={() => setLoadingRoute('logout')}
                    >
                        {loadingRoute === 'logout' ? 'Logging out…' : 'Log Out'}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
