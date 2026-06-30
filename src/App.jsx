import React, { useState, useEffect, useRef } from 'react';
import weddingData from './data/wedding.json';
import Cover from './components/Cover/Cover';
import Ayat from './components/Ayat/Ayat';
import Profile from './components/Profile/Profile';
import Story from './components/Story/Story';
import Events from './components/Events/Events';
import Gallery from './components/Gallery/Gallery';
import Video from './components/Video/Video';
import Wishes from './components/Wishes/Wishes';
import Gifts from './components/Gifts/Gifts';
import Closing from './components/Closing/Closing';
import Footer from './components/Footer/Footer';
import Floating from './components/Floating/Floating';
import SEO from './components/SEO/SEO';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [showCover, setShowCover] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Apply theme colors to CSS variables dynamically
    const root = document.documentElement;
    const colors = weddingData.theme.colors;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    
    // Initialize audio
    audioRef.current = new Audio(weddingData.music.url);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleOpen = (action) => {
    if (action === 'play_music_only') {
      setIsOpened(true);
      if (audioRef.current) {
        audioRef.current.volume = 0;
        audioRef.current.play().then(() => {
          setIsMusicPlaying(true);
          
          // Fade in logic: 0 to 0.4 over 3 seconds (3000ms)
          const fadeAudio = setInterval(() => {
            if (audioRef.current.volume < 0.39) {
              audioRef.current.volume += 0.01;
            } else {
              audioRef.current.volume = 0.4;
              clearInterval(fadeAudio);
            }
          }, 3000 / 40); // 40 steps
          
        }).catch(err => {
          console.error("Audio playback failed:", err);
        });
      }
      document.body.style.overflow = 'auto';
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  // Prevent scroll before opening
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    }
  }, [isOpened]);

  return (
    <>
      <SEO data={weddingData} />
      <Cover data={weddingData} onOpen={handleOpen} isOpened={isOpened} />
      
      {/* Only render content when cover is starting to open to optimize performance */}
      {isOpened && (
        <main style={{ opacity: 0, animation: 'fadeIn 1.5s ease-in-out 2s forwards' }}>
          <Ayat data={weddingData} />
          <Profile data={weddingData} />
          <Story data={weddingData} />
          <Events data={weddingData} />
          <Gallery data={weddingData} />
          <Video data={weddingData} />
          <Wishes />
          <Gifts data={weddingData} />
          <Closing data={weddingData} />
          <Footer />
          <Floating isMusicPlaying={isMusicPlaying} toggleMusic={toggleMusic} />
        </main>
      )}
    </>
  );
}

export default App;
