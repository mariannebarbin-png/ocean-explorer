import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import fetchWithCsrf from '@/lib/fetchWithCsrf';

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

                    <button
                        type="button"
                        className="ml-4 text-sm text-white/90 hover:text-white"
                        onClick={async () => {
                            try {
                                setLoadingRoute('logout');
                                const res = await fetchWithCsrf('/logout', { method: 'POST' });
                                // If server redirects with 302, some browsers may not expose
                                // the redirected location to fetch — perform a hard redirect
                                // to the login page on success to ensure session is cleared.
                                if (res.ok || res.status === 302) {
                                    window.location.href = route('login');
                                    return;
                                }

                                // If we get 419 or other errors, show an alert and clear loading
                                const body = await res.text().catch(() => '');
                                alert(`Logout failed: ${res.status} ${body}`);
                            } catch (e) {
                                console.error(e);
                                alert('Logout failed, please try again.');
                            } finally {
                                setLoadingRoute(null);
                            }
                        }}
                    >
                        {loadingRoute === 'logout' ? 'Logging out…' : 'Log Out'}
                    </button>
                </div>
            </div>
        </nav>
    );
}
