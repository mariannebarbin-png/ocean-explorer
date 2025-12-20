import { motion } from "framer-motion";
import { useState } from 'react';

export default function SpeciesCard({ species, onViewDetails, onAddToCollection, index }) {
    const [isViewing, setIsViewing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const photo = species.photo_url;
    const common = species.common_name || "Unknown Species";
    const sci = species.scientific_name;

    // ---- CLEAN & PREVIEW DESCRIPTION ----
    const cleanDescription = (text) => {
        if (!text) return null;
        return text.replace(/<[^>]*>/g, '').trim();
    };

    const getPreviewDescription = (text, maxLength = 180) => {
        if (!text) return null;

        const cleanText = cleanDescription(text);

        // First sentence only
        const firstSentence = cleanText.split('. ')[0];

        return firstSentence.length > maxLength
            ? firstSentence.slice(0, maxLength) + '...'
            : firstSentence + '.';
    };

    const previewDescription =
        getPreviewDescription(species.description) ||
        `The ${common} is an important part of ocean ecosystems. Scroll to learn more about its habitat and behavior.`;

    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`flex items-center gap-10 mb-20 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
        >
            {/* Image */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-64 h-64 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30"
            >
                {photo ? (
                    <img
                        src={photo}
                        alt={common}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-blue-900/50 flex items-center justify-center text-6xl">
                        
                    </div>
                )}
            </motion.div>

            {/* Story Card */}
            <motion.div
                className="flex-1 bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-xl text-white"
                whileHover={{ scale: 1.01 }}
            >
                <h3 className="text-4xl font-bold mb-2">{common}</h3>
                <p className="text-xl italic text-cyan-200 mb-4">{sci}</p>

                <p className="text-white/80 leading-relaxed mb-6">
                    {previewDescription}
                </p>

                <div className="flex gap-4">
                    <button
                        onClick={async () => {
                            if (isViewing) return;
                            setIsViewing(true);
                            try {
                                await onViewDetails(species.id);
                            } finally {
                                setIsViewing(false);
                            }
                        }}
                        disabled={isViewing || isAdding}
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg font-semibold disabled:opacity-60"
                    >
                        {isViewing ? 'Loading…' : 'Read More'}
                    </button>

                    <button
                        onClick={async () => {
                            if (isAdding) return;
                            setIsAdding(true);
                            try {
                                await onAddToCollection(species);
                            } finally {
                                setIsAdding(false);
                            }
                        }}
                        disabled={isAdding || isViewing}
                        className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 shadow-lg font-semibold disabled:opacity-60"
                    >
                        {isAdding ? 'Adding…' : 'Add to Collection'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
