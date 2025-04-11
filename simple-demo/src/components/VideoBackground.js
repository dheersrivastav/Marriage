import React, { useEffect, useRef } from 'react';

function VideoBackground({ videoUrl, fallbackImageUrl }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video plays automatically
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error playing video:", error);
      });
    }
  }, []);

  // Use the fallback image if video cannot be loaded
  const fallbackStyle = {
    backgroundImage: `url(${fallbackImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  };

  // Fixed video URL for reliable testing
  const reliableVideoUrl = "https://assets.mixkit.co/videos/preview/mixkit-elegant-wedding-cake-with-bokeh-background-9208-large.mp4";

  return (
    <div className="video-container">
      {/* Fallback background for when video is loading or not supported */}
      <div style={fallbackStyle}></div>
      
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="video-background"
      >
        <source src={reliableVideoUrl} type="video/mp4" />
        {/* Browser doesn't support video tag, fallback already displayed */}
      </video>
      
      {/* Overlay with gradient for better text readability */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(26, 34, 56, 0.8), rgba(128, 0, 32, 0.6), rgba(212, 175, 55, 0.4))',
          zIndex: -1
        }}
      ></div>
    </div>
  );
}

export default VideoBackground;