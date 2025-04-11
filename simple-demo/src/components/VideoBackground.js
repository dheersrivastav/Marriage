
import React, { useEffect, useRef, useState } from 'react';

function VideoBackground({ videoUrl, fallbackImageUrl, isYouTube = false }) {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  // YouTube video ID
  const youtubeVideoId = "6BCA0uEfUw4";

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div ref={containerRef} className="video-container relative w-full h-full">
      {/* Fallback background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${fallbackImageUrl || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80'})`,
        }}
      />

      {/* YouTube Video */}
      <div className="absolute inset-0 w-full h-full z-10">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1`}
          title="Background Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleIframeLoad}
          className="w-full h-full object-cover"
          style={{ border: 'none' }}
        />
      </div>

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 z-20"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 34, 56, 0.7), rgba(128, 0, 32, 0.5), rgba(212, 175, 55, 0.4))',
          backgroundSize: '400% 400%',
          animation: 'gradientOverlayAnimation 15s ease infinite'
        }}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
}

export default VideoBackground;
