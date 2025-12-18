import { motion, AnimatePresence } from 'framer-motion';

export default function SpeciesModal({ species, onClose, onAddToCollection }) {
    if (!species) return null;

    const scientificName = species.scientificName || species.scientific_name;
    const commonName = species.vernacularName || species.common_name;

    return (
        <AnimatePresence>
            <div 
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-blue-900/95 to-cyan-900/95 backdrop-blur-xl rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border-2 border-white/20"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-700 p-6 rounded-t-3xl border-b-2 border-white/20">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h2 className="text-4xl font-bold text-white mb-2">
                                    {commonName || 'Marine Species'}
                                </h2>
                                <p className="text-xl italic text-cyan-100">
                                    {scientificName}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white text-2xl transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-6 text-white">
                        {/* Authority */}
                        {(species.scientificNameAuthorship || species.authority) && (
                            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                                <h3 className="text-lg font-semibold text-cyan-300 mb-2">🔬 Scientific Authority</h3>
                                <p className="text-white/90">
                                    {species.scientificNameAuthorship || species.authority}
                                </p>
                            </div>
                        )}

                        {/* Taxonomic Rank */}
                        {(species.taxonRank || species.rank) && (
                            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                                <h3 className="text-lg font-semibold text-cyan-300 mb-2">Taxonomic Rank</h3>
                                <p className="text-white/90 capitalize">
                                    {species.taxonRank || species.rank}
                                </p>
                            </div>
                        )}

                        {/* Classification */}
                        {species.kingdom && (
                            <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                                <h3 className="text-lg font-semibold text-cyan-300 mb-3">Classification</h3>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-cyan-200 font-medium">Kingdom:</span>
                                        <p className="text-white/90">{species.kingdom}</p>
                                    </div>
                                    {species.phylum && (
                                        <div>
                                            <span className="text-cyan-200 font-medium">Phylum:</span>
                                            <p className="text-white/90">{species.phylum}</p>
                                        </div>
                                    )}
                                    {species.class && (
                                        <div>
                                            <span className="text-cyan-200 font-medium">Class:</span>
                                            <p className="text-white/90">{species.class}</p>
                                        </div>
                                    )}
                                    {species.order && (
                                        <div>
                                            <span className="text-cyan-200 font-medium">Order:</span>
                                            <p className="text-white/90">{species.order}</p>
                                        </div>
                                    )}
                                    {species.family && (
                                        <div>
                                            <span className="text-cyan-200 font-medium">Family:</span>
                                            <p className="text-white/90">{species.family}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-xl p-6 border border-cyan-500/30">
                            <h3 className="text-lg font-semibold text-cyan-300 mb-3">About This Species</h3>
                            <p className="text-white/90 leading-relaxed">
                                {species.description || `The ${commonName || scientificName} is a fascinating marine species that plays an important role in ocean ecosystems. These remarkable creatures have adapted to life in the ocean through millions of years of evolution.`}
                            </p>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={() => {
                                onAddToCollection(species);
                                onClose();
                            }}
                            className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105"
                        >
                            Add to My Collection
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}