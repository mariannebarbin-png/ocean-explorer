import { motion } from 'framer-motion';

export default function OceanBubbles() {
    return (
        <div className="fixed inset-0 pointer-events-none -z-5 overflow-hidden">
            {[...Array(15)].map((_, i) => {
                const size = 20 + Math.random() * 60;
                const left = Math.random() * 100;
                const duration = 8 + Math.random() * 8;
                const delay = Math.random() * 5;

                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/20 backdrop-blur-sm"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            left: `${left}%`,
                            bottom: '-10%',
                            boxShadow: 'inset -5px -5px 10px rgba(255,255,255,0.3)',
                        }}
                        animate={{
                            y: [0, -window.innerHeight - 100],
                            x: [0, Math.sin(i) * 50],
                            scale: [1, 1.2, 0.8],
                        }}
                        transition={{
                            duration: duration,
                            repeat: Infinity,
                            delay: delay,
                            ease: "easeInOut",
                        }}
                    />
                );
            })}
        </div>
    );
}