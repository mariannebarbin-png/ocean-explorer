import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion, AnimatePresence } from 'framer-motion';
import OceanBackground from '@/Components/OceanBackground';
import OceanBubbles from '@/Components/OceanBubbles';

export default function CollectionIndex({ auth, collections }) {
    const [editingNote, setEditingNote] = useState(null);
    const [noteText, setNoteText] = useState('');
    const [deletingId, setDeletingId] = useState(null);

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
                window.location.reload();
            }
        } catch (error) {
            console.error('Error saving note:', error);
            alert('Failed to save note');
        }
    };

    const handleDelete = async (collectionId) => {
        if (!confirm('Are you sure you want to remove this species from your collection?')) {
            return;
        }

        try {
            const response = await fetch(`/collection/${collectionId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });

            if (response.ok) {
                alert('🗑️ Species removed from collection');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error deleting:', error);
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
                            className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl"
                        >
                            📚 My Ocean Collection
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-cyan-200 mb-6"
                        >
                            Your personal marine species discovery journal
                        </motion.p>

                        <Link
                            href="/explore"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg transition-all"
                        >
                            🔍 Explore More Species
                        </Link>
                    </div>

                    {/* Collection Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border-2 border-white/20"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div>
                                <p className="text-4xl font-bold text-cyan-300">{collections.data?.length || 0}</p>
                                <p className="text-white/80">Species Collected</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-cyan-300">
                                    {collections.data?.filter(c => c.personal_notes).length || 0}
                                </p>
                                <p className="text-white/80">With Notes</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-cyan-300">
                                    {new Set(collections.data?.map(c => c.family)).size || 0}
                                </p>
                                <p className="text-white/80">Unique Families</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Collection Grid */}
                    {collections.data?.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <p className="text-3xl mb-4">🐠</p>
                            <p className="text-2xl text-white mb-4">Your collection is empty</p>
                            <p className="text-cyan-200 mb-6">Start exploring to add species!</p>
                            <Link
                                href="/explore"
                                className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-bold shadow-lg transition-all"
                            >
                                🚀 Start Exploring
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {collections.data?.map((collection, index) => (
                                <motion.div
                                    key={collection.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 hover:border-cyan-400/50 transition-all"
                                >
                                    {/* Card Header */}
                                    <div className="bg-gradient-to-r from-cyan-600/50 to-blue-700/50 p-6 text-center">
                                        <div className="text-6xl mb-3">{getEmoji(collection.common_name)}</div>
                                        <h3 className="text-2xl font-bold text-white mb-1">
                                            {collection.common_name || 'Marine Species'}
                                        </h3>
                                        <p className="text-sm italic text-cyan-200">
                                            {collection.scientific_name}
                                        </p>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6">
                                        {/* Taxonomy Info */}
                                        {collection.family && (
                                            <div className="mb-4">
                                                <span className="inline-block px-3 py-1 bg-cyan-500/30 text-cyan-100 rounded-full text-sm border border-cyan-400/30">
                                                    {collection.family}
                                                </span>
                                            </div>
                                        )}

                                        {/* Notes Section */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="text-sm font-semibold text-cyan-300">
                                                    📝 Your Notes:
                                                </label>
                                                {editingNote === collection.id ? (
                                                    <button
                                                        onClick={() => handleSaveNote(collection.id)}
                                                        className="text-xs px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                                                    >
                                                        ✓ Save
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEditNote(collection)}
                                                        className="text-xs px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                                    >
                                                        ✎ Edit
                                                    </button>
                                                )}
                                            </div>

                                            {editingNote === collection.id ? (
                                                <textarea
                                                    value={noteText}
                                                    onChange={(e) => setNoteText(e.target.value)}
                                                    placeholder="Add your observations, discoveries, or thoughts..."
                                                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 resize-none"
                                                    rows="4"
                                                />
                                            ) : (
                                                <div className="min-h-[100px] p-3 bg-white/5 border border-white/10 rounded-lg text-white/80 text-sm">
                                                    {collection.personal_notes || 'No notes yet. Click Edit to add your thoughts!'}
                                                </div>
                                            )}
                                        </div>

                                        {/* Added Date */}
                                        <p className="text-xs text-white/50 mb-4">
                                            Added: {new Date(collection.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleDelete(collection.id)}
                                                className="flex-1 px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg transition-colors font-semibold"
                                            >
                                                🗑️ Remove
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {collections.links && collections.links.length > 3 && (
                        <div className="mt-8 flex justify-center gap-2">
                            {collections.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    disabled={!link.url}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                        link.active
                                            ? 'bg-cyan-500 text-white'
                                            : link.url
                                            ? 'bg-white/10 text-white hover:bg-white/20'
                                            : 'bg-white/5 text-white/50 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}