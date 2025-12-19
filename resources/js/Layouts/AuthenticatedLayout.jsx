import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';

export default function AuthenticatedLayout({ header, children }) {
    const page = usePage();
    const user = page.props.auth.user;
    const collectionCount = page.props.collectionCount || 0;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100 relative z-10">
            <Navbar />

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="pt-24">{children}</main>
        </div>
    );
}
