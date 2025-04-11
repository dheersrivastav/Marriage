
import React, { useRef, useState, useEffect } from 'react';

function VideoBackground({ fallbackImageUrl, isYouTube = false }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  // YouTube video ID
  const youtubeVideoId = "6BCA0uEfUw4";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div ref={containerRef} className="video-container">
      {/* Fallback background */}
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
      {!hasError && (
        <iframe
          title="Background Video"
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
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
      )}

      {/* Loading State */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2
        }}>
          <div className="loading-spinner"></div>
        </div>
      )}

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
