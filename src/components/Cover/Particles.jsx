import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Particles = () => {
  // Generate random data once to avoid hydration mismatches or excessive re-renders
  const dustParticles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
  }, []);

  const jasmineFlowers = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -20 - 10,
      size: Math.random() * 10 + 10,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10
    }));
  }, []);

  const bokehs = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 50,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 mix-blend-screen">
      {/* Dust Particles */}
      {dustParticles.map((p) => (
        <motion.div
          key={`dust-${p.id}`}
          className="absolute rounded-full bg-[#f2eadf] shadow-[0_0_8px_2px_rgba(212,175,55,0.6)]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -150],
            x: [0, Math.random() * 40 - 20],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
        />
      ))}

      {/* Falling Jasmine (Melati) - Using simple white flower emoji/shape for elegance */}
      {jasmineFlowers.map((f) => (
        <motion.div
          key={`flower-${f.id}`}
          className="absolute text-white/70 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
          style={{
            fontSize: `${f.size}px`,
            left: `${f.x}%`,
            top: `${f.y}%`,
          }}
          animate={{
            y: ['0vh', '120vh'],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            ease: "linear",
            delay: f.delay
          }}
        >
          ❋
        </motion.div>
      ))}

      {/* Gold Bokeh */}
      {bokehs.map((b) => (
        <motion.div
          key={`bokeh-${b.id}`}
          className="absolute rounded-full bg-[#d4af37]/10 blur-[20px]"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            top: `${b.y}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay
          }}
        />
      ))}

      {/* Fog effect at the bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-[#d4af37]/10 to-transparent blur-[30px]"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scaleY: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformOrigin: 'bottom' }}
      />
    </div>
  );
};

export default Particles;
