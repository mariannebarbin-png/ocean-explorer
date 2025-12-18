import { motion, AnimatePresence } from 'framer-motion';

export default function StoryIntroModal({ show, onClose }) {
    if (!show) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
            >
                <motion.div
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: 50 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-blue-900/95 to-cyan-900/95 backdrop-blur-xl rounded-3xl max-w-2xl w-full p-10 shadow-2xl border-2 border-white/20"
                >
                    <div className="text-center">
                        {/* Icon */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-8xl mb-6"
                        >
                            
                        </motion.div>

                        {/* Title */}
                        <h2 className="text-5xl font-bold text-white mb-4">
                            Welcome to Ocean Explorer
                        </h2>

                        {/* Subtitle */}
                        <p className="text-2xl text-cyan-200 mb-8">
                            Voyage Through the Deep Blue
                        </p>

                        {/* Description */}
                        <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-lg mx-auto">
                            Embark on an immersive journey through Earth's oceans. 
                            Discover fascinating marine species, learn about their habitats, 
                            and build your own collection of ocean wonders. 
                            <br /><br />
                            <span className="text-cyan-300">Scroll down to begin your underwater adventure! </span>
                        </p>

                        {/* Action Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full text-xl font-bold shadow-2xl transition-all"
                        >
                            Start Exploring
                        </motion.button>

                        {/* Decorative elements */}
                        <div className="flex justify-center gap-8 mt-10 text-4xl opacity-50">
                            <motion.span
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                            >
                                🐋
                            </motion.span>
                            <motion.span
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                            >
                                🐬
                            </motion.span>
                            <motion.span
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                            >
                                🦈
                            </motion.span>
                            <motion.span
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                            >
                                🐢
                            </motion.span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}