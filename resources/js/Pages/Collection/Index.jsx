import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";

export default function Collection({ collections }) {
    return (
        <AppLayout>
            <h1 className="text-4xl font-bold mb-6">Your Collection</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {collections.data.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white/10 p-4 rounded-xl backdrop-blur-md shadow-lg"
                    >
                        <img
                            src={item.image_url}
                            className="rounded-xl h-40 w-full object-cover"
                        />

                        <h2 className="text-xl font-bold mt-3">{item.scientific_name}</h2>
                        <p className="text-blue-200">
                            {item.common_name || "No common name"}
                        </p>

                        <Link
                            href={`/journal/create?collection=${item.id}`}
                            className="mt-3 inline-block bg-cyan-300 hover:bg-cyan-400 text-black py-1 px-3 rounded-lg font-bold"
                        >
                            Add Journal
                        </Link>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
