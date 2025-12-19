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

    /* ---------------------------------
       Helpers
    ----------------------------------*/
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
        if (n.includes('crab')) return '🦀';
        if (n.includes('lobster')) return '🦞';
        if (n.includes('jellyfish')) return '🪼';
        if (n.includes('coral')) return '🪸';
        if (n.includes('starfish')) return '⭐';
        if (n.includes('seahorse')) return '🐴';
        if (n.includes('clownfish') || n.includes('clown')) return '🐠';
        return '🐟';
    };

    /* ---------------------------------
       Actions
    ----------------------------------*/
    const handleEditNote = (collection) => {
        setEditingNote(collection.id);
        setNoteText(collection.personal_notes || '');
    };

    const handleSaveNote = async (collectionId) => {
        try {
            const response = await fetch(`/collection/${collectionId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ personal_notes: noteText }),
            });

            if (response.ok) {
                alert('📝 Note saved successfully!');
                setEditingNote(null);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to save note');
        }
    };

    const handleDelete = async (collectionId) => {
        if (!confirm('Remove this species from your collection?')) return;

        try {
            const response = await fetch(`/collection/${collectionId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });

            if (response.ok) {
                setDeletedId(collectionId);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to delete species');
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Collection" />

            <OceanBackground />
            <OceanBubbles />

            <div className="relative min-h-screen py-12 px-4">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-bold text-white mb-4"
                        >
                            📚 My Ocean Collection
                        </motion.h1>
                        <p className="text-cyan-200 mb-6">
                            Your personal marine species discovery journal
                        </p>
                        <Link
                            href="/explore"
                            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg"
                        >
                            🔍 Explore More Species
                        </Link>
                    </div>

                    {/* Empty State */}
                    {collections.data?.length === 0 ? (
                        <div className="text-center py-20 text-white">
                            <p className="text-3xl mb-4">🐠</p>
                            <p className="text-2xl mb-4">Your collection is empty</p>
                            <Link
                                href="/explore"
                                className="px-8 py-4 bg-blue-600 rounded-xl font-bold"
                            >
                                Start Exploring
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {collections.data
                                .filter(c => c.id !== deletedId)
                                .map((collection, index) => (
                                <motion.div
                                    key={collection.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
                                >

                                    {/* Header */}
                                    <div className="p-6 text-center bg-blue-700/40">
                                        <div className="text-6xl mb-3">
                                            {getEmoji(collection.common_name)}
                                        </div>
                                        <h3 className="text-xl font-bold text-white">
                                            {collection.common_name || 'Marine Species'}
                                        </h3>
                                        <p className="text-sm italic text-cyan-200">
                                            {collection.scientific_name}
                                        </p>
                                    </div>

                                    {/* Body */}
                                    <div className="p-6">

                                        {/* Description */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-cyan-300 mb-2">
                                                🐚 About this species
                                            </h4>
                                            <div className="p-3 bg-white/5 rounded-lg text-white/80 text-sm leading-relaxed">
                                                {collection.description
                                                    ? cleanText(collection.description)
                                                    : 'No description available for this species.'}
                                            </div>
                                        </div>

                                        {/* Notes */}
                                        <div className="mb-4">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-cyan-300 text-sm font-semibold">
                                                    📝 Your Notes
                                                </span>
                                                {editingNote === collection.id ? (
                                                    <button
                                                        onClick={() => handleSaveNote(collection.id)}
                                                        className="text-xs px-3 py-1 bg-green-500 text-white rounded"
                                                    >
                                                        Save
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEditNote(collection)}
                                                        className="text-xs px-3 py-1 bg-blue-500 text-white rounded"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </div>

                                            {editingNote === collection.id ? (
                                                <textarea
                                                    value={noteText}
                                                    onChange={(e) => setNoteText(e.target.value)}
                                                    className="w-full p-2 bg-white/10 text-white rounded-lg"
                                                    rows="4"
                                                />
                                            ) : (
                                                <div className="p-3 bg-white/5 rounded-lg text-white/80 text-sm">
                                                    {collection.personal_notes || 'No notes yet.'}
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <button
                                            onClick={() => handleDelete(collection.id)}
                                            className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
                                        >
                                            🗑️ Remove
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
