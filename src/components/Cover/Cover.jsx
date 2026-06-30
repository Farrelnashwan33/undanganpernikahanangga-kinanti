import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import Particles from './Particles';

const Cover = ({ data, onOpen, isOpened }) => {
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const doorLeftRef = useRef(null);
  const doorRightRef = useRef(null);
  const doorContainerRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);
  const raysRef = useRef(null);
  const coupleRef = useRef(null);

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const yCouple = useTransform(scrollY, [0, 1000], [0, 150]);

  // Audio refs
  const woodSoundRef = useRef(null);
  const doorOpenSoundRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) setGuestName(to);

    // Initialize audio (placeholders)
    woodSoundRef.current = new Audio('/music/wood-knock.mp3');
    doorOpenSoundRef.current = new Audio('/music/door-open.mp3');
  }, []);

  const handleOpen = () => {
    onOpen('play_music_only');

    // Play sound effects (they might fail if not found, so catch errors)
    woodSoundRef.current?.play().catch(() => {});
    setTimeout(() => {
      doorOpenSoundRef.current?.play().catch(() => {});
    }, 500);

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#ffffff', '#F9F5EF'],
      shapes: ['circle', 'square'],
      ticks: 300,
      gravity: 0.4
    });

    const tl = gsap.timeline();

    // 1. Button and text fade out
    tl.to(contentRef.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" });

    // 2. Rays and glow intensify as door starts opening
    tl.to(glowRef.current, { opacity: 1, scale: 1.5, duration: 1, ease: "power2.out" }, "-=0.4");
    tl.to(raysRef.current, { opacity: 1, duration: 1 }, "<");

    // 3. Open doors with 3D transform (cubic-bezier)
    tl.to(doorLeftRef.current, { 
      rotationY: -105, 
      x: '-10%', 
      duration: 2.5, 
      ease: "power3.inOut" 
    }, "-=0.5");
    
    tl.to(doorRightRef.current, { 
      rotationY: 105, 
      x: '10%', 
      duration: 2.5, 
      ease: "power3.inOut" 
    }, "<");

    // 4. Camera dolly zoom forward (scale up container)
    tl.to(doorContainerRef.current, {
      scale: 1.3,
      opacity: 0,
      duration: 2.5,
      ease: "power2.in"
    }, "-=2.0");

    // 5. Reveal website hero
    tl.fromTo(heroRef.current, 
      { scale: 1.05, filter: 'blur(10px)' }, 
      { scale: 1, filter: 'blur(0px)', duration: 3, ease: "power2.out" }, 
      "-=1.5"
    );
  };

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] overflow-hidden bg-[#1a120b] flex items-center justify-center">
      
      {/* ----------------- WEBSITE HERO (Behind Doors) ----------------- */}
      <motion.div 
        ref={heroRef}
        className="absolute inset-0 w-full h-full transform origin-center"
      >
        <motion.div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/images/background/pendopo-sunrise.png')`,
            y: yBg
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[#d4af37]/10 mix-blend-overlay"></div>
        </motion.div>

        {/* Ambient Particles */}
        <Particles />

        <motion.div 
          ref={coupleRef}
          className="absolute bottom-0 left-0 w-full h-[100vh] flex justify-center items-end pointer-events-none z-20"
          style={{ y: yCouple }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
        >
          <img 
            src="/images/pengantin/pengantin.png" 
            alt="Pengantin" 
            className="h-full w-auto object-contain object-bottom scale-[1.15] drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transform origin-bottom"
          />
        </motion.div>
      </motion.div>

      {/* ----------------- 3D KERATON DOORS ----------------- */}
      <div 
        ref={doorContainerRef} 
        className={`absolute inset-0 z-40 perspective-[1500px] flex items-center justify-center ${isOpened ? 'pointer-events-none' : ''}`}
      >
        {/* Light rays from behind doors */}
        <div ref={raysRef} className="absolute inset-0 z-[-1] opacity-0 flex justify-center mix-blend-screen pointer-events-none">
            <div className="w-[10px] h-full bg-white blur-[10px] shadow-[0_0_50px_20px_#D4AF37]"></div>
        </div>

        {/* Glowing Ambient Behind Doors */}
        <div ref={glowRef} className="absolute w-[20vw] h-[50vh] bg-[#D4AF37] opacity-0 blur-[100px] z-[-1] rounded-full pointer-events-none"></div>

        {/* Left Door */}
        <div 
          ref={doorLeftRef}
          className="absolute top-0 left-0 w-1/2 h-full origin-left shadow-[20px_0_50px_rgba(0,0,0,0.8)] border-r-2 border-[#D4AF37]/30"
          style={{ 
            backgroundImage: `url('/images/background/keraton-door.png')`, 
            backgroundPosition: 'left center', 
            backgroundSize: '200% 100%', 
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none"></div>
        </div>

        {/* Right Door */}
        <div 
          ref={doorRightRef}
          className="absolute top-0 right-0 w-1/2 h-full origin-right shadow-[-20px_0_50px_rgba(0,0,0,0.8)] border-l-2 border-[#D4AF37]/30"
          style={{ 
            backgroundImage: `url('/images/background/keraton-door.png')`, 
            backgroundPosition: 'right center', 
            backgroundSize: '200% 100%',
            transformStyle: 'preserve-3d'
          }}
        >
           <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent pointer-events-none"></div>
        </div>
        
        {/* Foreground Content on Door */}
        <div 
          ref={contentRef} 
          className="absolute inset-0 flex flex-col items-center justify-center text-white z-50 pointer-events-none"
        >
          <div className="text-center px-4 max-w-lg mx-auto bg-[#1a120b]/60 backdrop-blur-md p-10 rounded-2xl border border-[#D4AF37]/30 pointer-events-auto shadow-[0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/50"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/50"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/50"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/50"></div>

            <p className="font-serif tracking-[0.3em] text-sm md:text-base mb-6 text-[#D4AF37]">━━━━━━━━━━━━━</p>
            <p className="font-serif tracking-widest text-sm md:text-base mb-4 uppercase text-[#F9F5EF]">The Wedding Of</p>
            <h1 className="font-['Great_Vibes'] text-5xl md:text-6xl lg:text-7xl font-normal mb-2 text-[#D4AF37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {data.couple.groom.nickname} 
              <span className="text-3xl mx-4 text-[#F9F5EF]">&</span> 
              {data.couple.bride.nickname}
            </h1>
            <p className="font-serif tracking-[0.3em] text-sm md:text-base mb-8 text-[#D4AF37] mt-4">━━━━━━━━━━━━━</p>
            
            <div className="mb-10 font-sans font-light">
              <p className="text-sm md:text-base mb-1 italic opacity-90 text-[#F9F5EF]">Kepada Yth.</p>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2 text-[#D4AF37]">{guestName}</h2>
              <p className="text-xs md:text-sm max-w-xs mx-auto opacity-70 leading-relaxed text-[#FFF8F0]">
                Klik tombol di bawah untuk membuka undangan
              </p>
            </div>

            <div className="flex justify-center relative">
              <div className={`absolute inset-0 rounded-full border border-[#D4AF37] opacity-50 scale-150 animate-ping ${isHovered ? 'block' : 'hidden'}`} style={{ animationDuration: '2s' }}></div>
              
              <button 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#8a6b32] via-[#D4AF37] to-[#b39556] text-[#1a120b] transition-all duration-500 transform hover:scale-110 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.8)] border border-white/20 overflow-hidden group"
                onClick={handleOpen}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="flex flex-col items-center pointer-events-none">
                  <span className={`text-2xl mb-1 transition-transform duration-700 ${isHovered ? 'rotate-180' : ''}`}>🌸</span>
                  <span className="text-xs md:text-sm font-semibold tracking-wider font-serif uppercase">Buka</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cover;
