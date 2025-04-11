import React, { useRef } from 'react';

function VideoBackground({ fallbackImageUrl, isYouTube = false }) {
  const containerRef = useRef(null);

  // YouTube video ID
  const youtubeVideoId = "6BCA0uEfUw4";

  return (
    <div ref={containerRef} className="video-container">
      {/* Fallback background always visible as base layer */}
      <div style={{
        backgroundImage: `url(${fallbackImageUrl || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
      }}></div>

      {/* YouTube Video */}
      <iframe
        title="Background Video"
        src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&playsinline=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          border: 'none',
          objectFit: 'cover',
          zIndex: -1
        }}
      />

      {/* Animated gradient overlay */}
      <div 
        className="video-overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(26, 34, 56, 0.7), rgba(128, 0, 32, 0.5), rgba(212, 175, 55, 0.4))',
          backgroundSize: '400% 400%',
          animation: 'gradientOverlayAnimation 15s ease infinite',
          zIndex: 0,
        }}
      ></div>
    </div>
  );
}

export default VideoBackground;