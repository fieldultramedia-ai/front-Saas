import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // High quality royalty-free ambient track
  const audioUrl = "https://cdn.pixabay.com/audio/2022/03/15/audio_73147814b6.mp3?filename=lo-fi-hip-hop-120-bpm-10651.mp3";

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error("Autoplay blocked or error playing audio:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Initial attempt to play (might be blocked by browser)
    const playAttempt = () => {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    };
    playAttempt();
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        loop 
        preload="auto"
      />
      
      {/* Equalizer animation bars (only visible when playing) */}
      {isPlaying && (
        <div className="equalizer-container" style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '3px',
          height: '20px'
        }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bar" style={{
              width: '3px',
              backgroundColor: '#00D4FF',
              borderRadius: '2px',
              animation: `bar-grow ${0.5 + Math.random()}s ease-in-out infinite alternate`
            }} />
          ))}
        </div>
      )}

      <button
        onClick={toggleMusic}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: isPlaying ? '#00D4FF' : 'rgba(255, 255, 255, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: isPlaying ? '0 0 20px rgba(0, 212, 255, 0.2)' : 'none',
        }}
        onMouseEnter={(e) => e.currentTarget.style.border = '1px solid rgba(0, 212, 255, 0.3)'}
        onMouseLeave={(e) => e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)'}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <style>{`
        @keyframes bar-grow {
          0% { height: 4px; }
          100% { height: 18px; }
        }
      `}</style>
    </div>
  );
};

export default BackgroundMusic;
