import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import OceanBackground from '@/Components/OceanBackground';
import OceanBubbles from '@/Components/OceanBubbles';

export default function CollectionIndex({ auth, collections }) {
    const [editingNote, setEditingNote] = useState(null);
    const [noteText, setNoteText] = useState('');
    const [deletedId, setDeletedId] = useState(null);
    const [savingNoteId, setSavingNoteId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    /* -----------------------------
       Helpers
    ------------------------------ */
    const cleanText = (text) => {
        if (!text) return '';
        return text.replace(/<[^>]*>/g, '').trim();
    };

    const getEmoji = (name) => {
        const n = (name || '').toLowerCase();
        if (n.includes('shark')) return '🦈';
        if (n.includes('whale')) return '🐋';
        if (n.includes('dolphin')) return '🐬';
        if (n.includes('turtle')) return '🐢';
        if (n.includes('octopus')) return '🐙';
        return '🐟';
    };

    /* -----------------------------
       Actions
    ------------------------------ */
    const handleEditNote = (collection) => {
        setEditingNote(collection.id);
        setNoteText(collection.personal_notes || '');
    };

    const handleSaveNote = async (collectionId) => {
        try {
            setSavingNoteId(collectionId);

            const response = await fetch(`/collection/${collectionId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                },
                credentials: 'same-origin',
                body: JSON.stringify({ personal_notes: noteText }),
            });

            if (response.ok) {
                setEditingNote(null);
            } else {
                alert('Failed to save note');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSavingNoteId(null);
        }
    };

    const handleDelete = async (collectionId) => {
        if (!confirm('Remove this species from your collection?')) return;

        try {
            const response = await fetch(`/collection/${collectionId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                },
                credentials: 'same-origin',
            });

            if (response.ok) {
                setDeletedId(collectionId);
            }
        } catch (error) {
            console.error(error);
        }
    };

    /* -----------------------------
       Search filter
    ------------------------------ */
    const filteredCollections = collections.data
        ?.filter(c => c.id !== deletedId)
        ?.filter(c =>
            c.common_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.scientific_name?.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Collection" />

            <OceanBackground />
            <OceanBubbles />

            <div className="relative min-h-screen py-12 px-4">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-bold text-white mb-4"
                        >
                            My Ocean Collection
                        </motion.h1>

                        <p className="text-cyan-200 mb-6">
                            Personal marine species discovery journal
                        </p>

                        {/* 🔍 Search Collection */}
                        <input
                            type="text"
                            placeholder="Search your collection..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="
                                w-full max-w-md mx-auto
                                px-5 py-3
                                bg-white/10 backdrop-blur
                                text-white placeholder-white/60
                                rounded-xl border border-white/20
                                focus:outline-none focus:ring-2 focus:ring-cyan-400
                            "
                        />
                    </div>

                    {/* Empty State */}
                    {filteredCollections.length === 0 ? (
                        <div className="text-center py-20 text-white">
                            <p className="text-2xl mb-4">No species found</p>
                            <Link
                                href="/explore"
                                className="px-8 py-4 bg-blue-600 rounded-xl font-bold"
                            >
                                Explore Ocean
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCollections.map((collection, index) => (
                                <motion.div
                                    key={collection.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden"
                                >
                                    {/* Image Header */}
                                    <div className="h-48 bg-black/30">
                                        {collection.image_url ? (
                                            <img
                                                src={collection.image_url}
                                                alt={collection.common_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-full flex items-center justify-center text-6xl">
                                                {getEmoji(collection.common_name)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white">
                                            {collection.common_name || 'Marine Species'}
                                        </h3>
                                        <p className="text-sm italic text-cyan-200 mb-3">
                                            {collection.scientific_name}
                                        </p>

                                        {/* Description */}
                                        <div className="mb-4 text-white/80 text-sm">
                                            {collection.description
                                                ? cleanText(collection.description)
                                                : 'No description available.'}
                                        </div>

                                        {/* Notes */}
                                        <div className="mb-4">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-cyan-300 text-sm font-semibold">
                                                    📝 Notes
                                                </span>
                                                {editingNote === collection.id ? (
                                                    <button
                                                        onClick={() => handleSaveNote(collection.id)}
                                                        disabled={savingNoteId === collection.id}
                                                        className="text-xs px-3 py-1 bg-green-500 rounded"
                                                    >
                                                        {savingNoteId === collection.id ? 'Saving...' : 'Save'}
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEditNote(collection)}
                                                        className="text-xs px-3 py-1 bg-blue-500 rounded"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </div>

                                            {editingNote === collection.id ? (
                                                <textarea
                                                    value={noteText}
                                                    onChange={(e) => setNoteText(e.target.value)}
                                                    rows="3"
                                                    className="w-full p-2 bg-white/10 rounded text-white"
                                                />
                                            ) : (
                                                <div className="p-2 bg-white/5 rounded text-white/80 text-sm">
                                                    {collection.personal_notes || 'No notes yet.'}
                                                </div>
                                            )}
                                        </div>

                                        {/* Delete */}
                                        <button
                                            onClick={() => handleDelete(collection.id)}
                                            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
