import React, { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { router, usePage } from "@inertiajs/react";

export default function EditJournal() {
    const { entry } = usePage().props;

    const [form, setForm] = useState({
        title: entry.title,
        personal_notes: entry.personal_notes,
        discovery_date: entry.discovery_date,
    });

    const submit = () => {
        router.patch(`/journal/${entry.id}`, form);
    };

    return (
        <AppLayout>
            <h1 className="text-4xl font-bold mb-6">Edit Entry</h1>

            <input
                type="text"
                value={form.title}
                className="w-full p-3 mb-4 rounded-xl bg-white/20"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
                rows="5"
                className="w-full p-3 mb-4 rounded-xl bg-white/20"
                value={form.personal_notes}
                onChange={(e) => setForm({ ...form, personal_notes: e.target.value })}
            />

            <input
                type="date"
                className="w-full p-3 mb-4 rounded-xl bg-white/20"
                value={form.discovery_date}
                onChange={(e) => setForm({ ...form, discovery_date: e.target.value })}
            />

            <button
                onClick={submit}
                className="bg-cyan-300 hover:bg-cyan-400 text-black py-3 w-full rounded-xl font-bold"
            >
                Update Entry
            </button>
        </AppLayout>
    );
}
