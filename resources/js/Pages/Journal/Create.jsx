import React, { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { router, usePage } from "@inertiajs/react";

export default function CreateJournal() {
    const { collection } = usePage().props;
    const [form, setForm] = useState({
        title: "",
        personal_notes: "",
        discovery_date: "",
        collection_id: collection || null,
    });

    const submit = () => {
        router.post("/journal", form);
    };

    return (
        <AppLayout>
            <h1 className="text-4xl font-bold mb-6">New Journal Entry</h1>

            <input
                type="text"
                placeholder="Title"
                className="w-full p-3 mb-4 rounded-xl bg-white/20"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
                rows="5"
                className="w-full p-3 mb-4 rounded-xl bg-white/20"
                placeholder="Write your notes..."
                onChange={(e) => setForm({ ...form, personal_notes: e.target.value })}
            />

            <input
                type="date"
                className="w-full p-3 mb-4 rounded-xl bg-white/20"
                onChange={(e) => setForm({ ...form, discovery_date: e.target.value })}
            />

            <button
                onClick={submit}
                className="bg-cyan-300 hover:bg-cyan-400 text-black py-3 w-full rounded-xl font-bold"
            >
                Save Entry
            </button>
        </AppLayout>
    );
}
