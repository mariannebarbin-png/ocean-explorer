import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import OceanBackground from '@/Components/OceanBackground';
import OceanBubbles from '@/Components/OceanBubbles';
import SpeciesCard from '@/Components/SpeciesCard';
import SpeciesModal from '@/Components/SpeciesModal';
import StoryIntroModal from '@/Components/StoryIntroModal';

export default function Explore({ auth, species = [], collectionCount = 0 }) {
    const [showIntro, setShowIntro] = useState(true);
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/species/search?query=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            setSearchResults(data.results || []);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const viewDetails = async (taxonId) => {
        try {
            const response = await fetch(`/api/species/${taxonId}`);
            const data = await response.json();
            setSelectedSpecies(data.species);
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    };

    const addToCollection = async (species) => {
    try {
        const collectionData = {
            taxon_id: species.id,
            scientific_name: species.name,
            common_name: species.preferred_common_name || null,
            description:
                species.description ||
                species.wikipedia_summary ||
                null,
            rank: species.rank,
            image_url: species.photo_url || null,
            family: species.family || null,
        };

        const response = await fetch('/collection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document
                    .querySelector('meta[name="csrf-token"]')
                    .content,
            },
            body: JSON.stringify(collectionData),
        });

        if (response.ok) {
            alert('🌊 Species added to your collection!');
        }

    } catch (error) {
        console.error(error);
    }
};


    const displayedSpecies = searchResults.length > 0 ? searchResults : species;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Explore Ocean" />

            {/* Ocean Background */}
            <OceanBackground />
            <OceanBubbles />

            {/* Intro Modal */}
            <StoryIntroModal show={showIntro} onClose={() => setShowIntro(false)} />

            {/* Main Content */}
            <div className="relative min-h-screen">
                {/* Hero Section */}
                <div className="relative pt-20 pb-16 px-4">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
                        >
                            Ocean Explorer
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-2xl text-cyan-100 mb-10 drop-shadow-lg"
                        >
                            Discover the mysteries of the deep blue sea
                        </motion.p>

                        {/* Search Bar */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            onSubmit={handleSearch}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="flex gap-3 bg-white/10 backdrop-blur-lg rounded-2xl p-2 border-2 border-white/20 shadow-2xl">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for marine life... (shark, dolphin, coral)"
                                    className="flex-1 px-6 py-4 bg-transparent text-white placeholder-white/60 text-lg focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg"
                                >
                                    {loading ? 'Searching...' : 'Search'}
                                </button>
                            </div>
                        </motion.form>
                        {/*add to collection button */}
                            {/* collection link moved to navbar */}
                        {searchResults.length > 0 && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={() => {
                                    setSearchQuery('');
                                    setSearchResults([]);
                                }}
                                className="mt-4 text-cyan-300 underline hover:text-white transition-colors"
                            >
                                Clear search and show all species
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Story Section */}
                <div className="max-w-5xl mx-auto px-4 pb-20">
                    {displayedSpecies.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <p className="text-2xl text-white/80">
                                {loading ? 'Searching the depths...' : 'Search to discover marine species'}
                            </p>
                        </motion.div>
                    ) : (
                        <>
                            {/* Section Title */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-16"
                            >
                                <h2 className="text-4xl font-bold text-white mb-4">
                                    {searchResults.length > 0 ? 'Search Results' : 'Featured Marine Species'}
                                </h2>
                                <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full"></div>
                            </motion.div>

                            {/* Species Cards - Scrollable Story */}
                            <div className="space-y-8">
                                {displayedSpecies.map((item, index) => (
                                    <SpeciesCard
                                        key={item.taxonID || item.id || index}
                                        species={item}
                                        onViewDetails={viewDetails}
                                        onAddToCollection={addToCollection}
                                        index={index}
                                    />
                                ))}
                            </div>

                            {/* End of Journey Message */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-center mt-20 py-16 bg-white/10 backdrop-blur-lg rounded-3xl border-2 border-white/20"
                            >
                                <p className="text-3xl text-white font-bold mb-4">
                                    End of Your Ocean Journey
                                </p>
                                <p className="text-xl text-cyan-200 mb-6">
                                    You've discovered {displayedSpecies.length} amazing species!
                                </p>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-bold shadow-lg transition-all"
                                >
                                    Back to Surface
                                </button>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>

            {/* Species Detail Modal */}
            {selectedSpecies && (
                <SpeciesModal
                    species={selectedSpecies}
                    onClose={() => setSelectedSpecies(null)}
                    onAddToCollection={addToCollection}
                />
            )}
        </AuthenticatedLayout>
    );
}

