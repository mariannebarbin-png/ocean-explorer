import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";

export default function Journal({ entries }) {
    return (
        <AppLayout>
            <h1 className="text-4xl font-bold mb-6">Journal</h1>

            <Link
                href="/journal/create"
                className="bg-cyan-300 hover:bg-cyan-400 text-black px-4 py-2 rounded-xl font-bold"
            >
                + New Entry
            </Link>

            <div className="mt-6 space-y-4">
                {entries.data.map((entry) => (
                    <div key={entry.id} className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
                        <h2 className="text-2xl font-bold">{entry.title}</h2>
                        <p className="text-blue-200 text-sm">{entry.discovery_date}</p>
                        <p className="mt-2">{entry.personal_notes}</p>

                        <Link
                            href={`/journal/${entry.id}/edit`}
                            className="text-cyan-300 underline mt-3 inline-block"
                        >
                            Edit
                        </Link>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
